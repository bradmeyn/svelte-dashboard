<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const tempChartData = [
		{ label: 'January', value: 4000 },
		{ label: 'February', value: 3000 },
		{ label: 'March', value: 5000 },
		{ label: 'April', value: 4000 },
		{ label: 'May', value: 6000 },
		{ label: 'June', value: 7000 }
	];
</script>

<div class="grid grid-cols-4 gap-4">
	<Card.Root class="col-span-1 space-y-1 p-4">
		<p class="text-muted-foreground">Total</p>
		<p class="text-xl font-semibold">$10,000</p>
	</Card.Root>
	<Card.Root class="col-span-1 space-y-1 p-4">
		<p class="text-muted-foreground">Pending</p>
		<p class="text-xl font-semibold">$2,500</p>
	</Card.Root>
	<Card.Root class="col-span-1 space-y-1 p-4">
		<p class="text-muted-foreground">Completed</p>
		<p class="text-xl font-semibold">$7,500</p>
	</Card.Root>
	<Card.Root class="col-span-1 space-y-1 p-4">
		<p class="text-muted-foreground">Completed</p>
		<p class="text-xl font-semibold">$7,500</p>
	</Card.Root>
</div>
