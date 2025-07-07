import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const timestamps = {
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow()
};

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').notNull().unique(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	...timestamps
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const titleEnum = pgEnum('titles', ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr']);

export const clients = pgTable('clients', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: titleEnum('title').notNull(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	...timestamps
});

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type ClientInsert = typeof clients.$inferInsert;
export type SessionInsert = typeof sessions.$inferInsert;
