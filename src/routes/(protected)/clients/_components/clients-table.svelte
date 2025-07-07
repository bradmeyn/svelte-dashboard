<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	import { Button } from '$lib/components/ui/button';

	const tempClients = [
		{
			id: '1',
			title: 'Mr',
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@mail.com'
		},
		{
			id: '2',
			title: 'Ms',
			firstName: 'Jane',
			lastName: 'Smith',
			email: 'jsmith@mail.com'
		}
	];

	function handleEdit(clientId: string) {
		console.log('Edit client:', clientId);
		// Add your edit logic here
	}

	function handleDelete(clientId: string) {
		console.log('Delete client:', clientId);
		// Add your delete logic here
	}

	function handleView(clientId: string) {
		console.log('View client:', clientId);
		// Add your view logic here
	}
</script>

<Table.Root>
	<Table.Caption>A list of your clients.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Email</Table.Head>
			<Table.Head class="text-right">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each tempClients as client (client.id)}
			<Table.Row>
				<Table.Cell class="font-medium">
					{client.title}
					{client.firstName}
					{client.lastName}
				</Table.Cell>
				<Table.Cell>{client.email}</Table.Cell>
				<Table.Cell class="text-right">...</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
