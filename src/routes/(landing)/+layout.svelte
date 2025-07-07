<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import '../../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header class="container mx-auto flex items-center justify-between p-4">
		<h1 class="font-bold">Svelte Dashboard</h1>

		<div>
			<nav>
				<ul class="flex space-x-4">
					<Button href="/login" variant="ghost">Login</Button>
					<Button href="/register">Register</Button>
				</ul>
			</nav>
		</div>
	</header>
	<main class="container mx-auto flex-1 p-4">
		{@render children()}
	</main>
	<footer>
		<p>© 2023 Svelte Dashboard</p>
	</footer>
</div>
