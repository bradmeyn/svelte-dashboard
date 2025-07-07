<script lang="ts">
	import { enhance } from '$app/forms';
	import { z } from 'zod';
	import type { ActionData, PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { registerSchema } from '$lib/schemas/auth';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Alert from '$lib/components/ui/alert';

	type Props = {
		form: ActionData;
		data: PageData;
	};

	let { form }: Props = $props();
	let isLoading = $state(false);
	let serverError = $state('');
	let fieldErrors = $state({
		username: '',
		email: '',
		password: '',
		confirmation: ''
	});

	function handleInput(field: keyof typeof fieldErrors) {
		return () => {
			fieldErrors[field] = '';
		};
	}

	function mapZodErrorsToFieldErrors(errors: z.ZodError) {
		const { fieldErrors: mapped } = errors.flatten();
		fieldErrors = { ...fieldErrors, ...mapped };
	}

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		const validation = registerSchema.safeParse({
			username: formData.get('username'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmation: formData.get('confirmation')
		});

		console.log('Validation result:', validation);

		if (!validation.success) {
			mapZodErrorsToFieldErrors(validation.error);
			cancel();
			return;
		}

		return async ({ result, update }) => {
			isLoading = true;
			console.log(result);
			switch (result.type) {
				case 'failure':
					isLoading = false;
					serverError = result?.data?.error || 'An error occurred';
				default:
					break;
			}
			await update();
		};
	};
</script>

<Card.Root class="mx-auto w-full max-w-md">
	<Card.Header>
		<Card.Title>Create Account</Card.Title>
		<Card.Description>Sign up to get started with your new account.</Card.Description>
	</Card.Header>

	<Card.Content>
		<form method="POST" use:enhance={submit} class="space-y-4">
			{#if form?.error}
				<Alert.Root variant="destructive" class="mb-4">
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>{form.error}</Alert.Description>
				</Alert.Root>
			{/if}

			{#if form?.success}
				<Alert.Root variant="default" class="mb-4">
					<Alert.Title>Success</Alert.Title>
					<Alert.Description>Account created successfully! You can now login.</Alert.Description>
				</Alert.Root>
			{/if}

			<div class="space-y-2">
				<Label for="username">Username</Label>
				<Input
					id="username"
					name="username"
					type="text"
					required
					placeholder="Choose a username"
					value={form?.username ?? ''}
				/>
				{#if form?.errors?.username}
					<p class="text-destructive text-sm">{form.errors.username}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					required
					placeholder="Enter your email"
					value={form?.email ?? ''}
				/>
				{#if form?.errors?.email}
					<p class="text-destructive text-sm">{form.errors.email}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Label for="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					required
					placeholder="Create a password"
				/>
				{#if form?.errors?.password}
					<p class="text-destructive text-sm">{form.errors.password}</p>
				{/if}
			</div>

			<div class="space-y-2">
				<Label for="confirmation">Confirm Password</Label>
				<Input
					id="confirmation"
					name="confirmation"
					type="password"
					required
					placeholder="Confirm your password"
				/>
				{#if form?.errors?.confirm}
					<p class="text-destructive text-sm">{form.errors.confirm}</p>
				{/if}
			</div>

			<Button type="submit" class="w-full">{isLoading ? 'Submitting...' : 'Create Account'}</Button>
		</form>
	</Card.Content>

	<Card.Footer>
		<p class="text-muted-foreground text-center text-sm">
			Already have an account? <a href="/login" class="text-primary hover:underline">Sign in</a>.
		</p>
	</Card.Footer>
</Card.Root>
