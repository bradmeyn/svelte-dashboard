<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import * as Card from '$lib/components/ui/card';
	import { loginSchema } from '$lib/schemas/auth';
	import { z } from 'zod';
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
		email: '',
		password: ''
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
		const validation = loginSchema.safeParse({
			email: formData.get('email'),
			password: formData.get('password')
		});

		console.log('Validation result:', validation);

		if (!validation.success) {
			mapZodErrorsToFieldErrors(validation.error);
			cancel();
			return;
		}

		return async ({ result, update }) => {
			isLoading = true;
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
		<Card.Title>Login</Card.Title>
		<Card.Description>Enter your credentials to access your account.</Card.Description>
	</Card.Header>

	<Card.Content>
		<form method="POST" use:enhance={submit} class="space-y-4">
			{#if form?.error}
				<Alert.Root variant="destructive" class="mb-4">
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>{form.error}</Alert.Description>
				</Alert.Root>
			{/if}

			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input id="email" name="email" type="email" required placeholder="Enter your email" />
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
					placeholder="Enter your password"
				/>
				{#if form?.errors?.password}
					<p class="text-destructive text-sm">{form.errors.password}</p>
				{/if}
			</div>

			<Button type="submit" class="w-full">
				{isLoading ? 'Logging in...' : 'Login'}
			</Button>
		</form>
	</Card.Content>

	<Card.Footer>
		<p class="text-muted-foreground text-center text-sm">
			New here? <a href="/register" class="text-primary hover:underline">Create an account</a>.
		</p>
	</Card.Footer>
</Card.Root>
