<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header class="container mx-auto p-4">Svelte Dashboard</header>
	<main class="container mx-auto flex-1 p-4">
		{@render children()}
	</main>
	<footer>
		<p>© 2023 Svelte Dashboard</p>
	</footer>
</div>
