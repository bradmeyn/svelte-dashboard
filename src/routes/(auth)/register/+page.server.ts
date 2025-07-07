import { db } from '$db/index';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { registerSchema } from '$lib/schemas/auth';
import { users } from '$db/schema';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = registerSchema.safeParse(formData);

		if (!result.success) {
			return fail(400, {
				error: 'Invalid data'
			});
		}

		const { username, email, password } = result.data;

		try {
			const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

			if (existingUser.length > 0) {
				return fail(400, {
					error: 'An account with this email already exists'
				});
			}

			const hashedPassword = await argon2.hash(password);

			const newUser = await db
				.insert(users)
				.values({
					username,
					email,
					password: hashedPassword
				})
				.returning();

			// Use your session utilities
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, newUser[0].id);

			setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, {
				error: 'An error occurred while registering'
			});
		}

		return redirect(303, '/dashboard');
	}
};
