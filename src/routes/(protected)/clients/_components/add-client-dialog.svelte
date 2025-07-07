<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Plus } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let dialogOpen = false;
	let formData = {
		title: '',
		firstName: '',
		lastName: '',
		email: ''
	};

	const titles = ['Mr', 'Ms', 'Mrs', 'Dr', 'Prof'];

	let selectedTitle = $state('Mr');
	function submit() {
		// Validate form
		if (!selectedTitle || !formData.firstName || !formData.lastName || !formData.email) {
			alert('Please fill in all fields');
			return;
		}

		// Create new client object
		const newClient = {
			id: Date.now().toString(), // Simple ID generation
			title: selectedTitle,
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email
		};

		console.log('New client:', newClient);

		// Reset form
		resetForm();
		dialogOpen = false;

		// Here you would typically add the client to your data store or send to API
	}

	function resetForm() {
		formData = {
			title: '',
			firstName: '',
			lastName: '',
			email: ''
		};
	}

	function handleCancel() {
		resetForm();
		dialogOpen = false;
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger>
		<Button class="gap-2">
			<Plus class="h-4 w-4" />
			Add Client
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add New Client</Dialog.Title>
			<Dialog.Description>
				Enter the client's information below. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<form use:enhance={submit} class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="title" class="text-right">Title</Label>
				<div class="col-span-3">
					<Select.Root bind:value={selectedTitle}>
						<Select.Trigger>
							{selectedTitle}
						</Select.Trigger>
						<Select.Content>
							{#each titles as title}
								<Select.Item value={title}>{title}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="firstName" class="text-right">First Name</Label>
				<Input
					id="firstName"
					bind:value={formData.firstName}
					class="col-span-3"
					placeholder="Enter first name"
					required
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="lastName" class="text-right">Last Name</Label>
				<Input
					id="lastName"
					bind:value={formData.lastName}
					class="col-span-3"
					placeholder="Enter last name"
					required
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="email" class="text-right">Email</Label>
				<Input
					id="email"
					type="email"
					bind:value={formData.email}
					class="col-span-3"
					placeholder="Enter email address"
					required
				/>
			</div>
			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={handleCancel}>Cancel</Button>
				<Button>Save Client</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
