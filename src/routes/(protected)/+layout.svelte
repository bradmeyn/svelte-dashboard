<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Home, Users, LogOut } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	let { children } = $props();
	const year = new Date().getFullYear();

	const navigation = [
		{ name: 'Dashboard', href: '/dashboard', icon: Home },
		{ name: 'Clients', href: '/clients', icon: Users }
	];
</script>

<div class="bg-background flex min-h-screen">
	<!-- Sidebar -->
	<div class="bg-card fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r shadow-sm">
		<!-- Sidebar Header -->
		<div class="flex h-16 items-center border-b px-6">
			<h1 class="text-foreground text-xl font-semibold">Svelte Dashboard</h1>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 space-y-2 p-4">
			{#each navigation as item}
				<Button
					href={item.href}
					variant={$page.url.pathname === item.href ? 'secondary' : 'ghost'}
					size="sm"
				>
					<item.icon class="mr-3 size-4" />
					<span>{item.name}</span>
				</Button>
			{/each}
		</nav>

		<Separator class="mx-4" />

		<!-- Logout Section -->
		<div class="p-4">
			<form method="POST" action="?/logout" use:enhance>
				<Button
					type="submit"
					variant="ghost"
					size="sm"
					class="text-muted-foreground hover:text-foreground h-9 w-full justify-start px-3 text-sm font-medium"
				>
					<LogOut class="mr-3 h-4 w-4" />
					Logout
				</Button>
			</form>
		</div>
	</div>

	<!-- Main content -->
	<div class="ml-64 flex flex-1 flex-col">
		<!-- Header -->
		<header
			class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur"
		>
			<div class="flex h-16 items-center justify-between px-6">
				<h2 class="text-foreground text-lg font-semibold">
					{#if $page.url.pathname === '/dashboard'}
						Dashboard
					{:else if $page.url.pathname === '/clients'}
						Clients
					{:else}
						Home
					{/if}
				</h2>

				<div class="flex items-center space-x-4">
					<!-- User Avatar -->
					<Button variant="secondary" size="icon" class="h-8 w-8 rounded-full">
						<span class="text-sm font-medium">U</span>
					</Button>
				</div>
			</div>
		</header>

		<!-- Main content area -->
		<main class="flex-1 overflow-auto p-6">
			<div class="mx-auto max-w-7xl">
				{@render children()}
			</div>
		</main>

		<!-- Footer -->
		<footer class="bg-muted/50 border-t px-6 py-4">
			<p class="text-muted-foreground text-sm">© {year} Svelte Dashboard</p>
		</footer>
	</div>
</div>
