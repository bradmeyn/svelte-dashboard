import { db } from '$db/index';
import { redirect, type Actions } from '@sveltejs/kit';
import { sessions } from '$db/schema'; // Add sessions import
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const sessionToken = cookies.get('auth-session');

		if (sessionToken) {
			// Remove session from database
			await db.delete(sessions).where(eq(sessions.id, sessionToken));
		}

		// Clear the session cookie
		cookies.delete('auth-session', {
			path: '/',
			secure: true,
			httpOnly: true,
			sameSite: 'strict'
		});

		return redirect(303, '/login');
	}
};
