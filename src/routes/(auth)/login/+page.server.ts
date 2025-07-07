import { db } from '$db/index';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { loginSchema } from '$lib/schemas/auth';
import { users } from '$db/schema';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		console.log('Login action triggered');
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		// Validate the form data using Zod
		const result = loginSchema.safeParse({ email, password });

		if (!result.success) {
			// If validation fails, return the errors
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data: { email, password }
			});
		}

		const validatedData = result.data;

		try {
			// Find the user by email using Drizzle
			const userResult = await db
				.select()
				.from(users)
				.where(eq(users.email, validatedData.email))
				.limit(1);

			// If the user does not exist, return an error
			if (userResult.length === 0) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}

			const user = userResult[0];

			// Compare the password using Argon2
			const passwordMatch = await argon2.verify(user.password, validatedData.password);

			// If the password does not match, return an error
			if (!passwordMatch) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}

			// Create session using your utilities
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, user.id);

			setSessionTokenCookie(cookies, sessionToken, session.expiresAt);

			// Redirect to a protected route or dashboard
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, { error: 'An error occurred during login' });
		}

		return redirect(303, '/dashboard');
	}
};
