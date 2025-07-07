<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Home, Users, Menu, X, LogOut } from 'lucide-svelte';

	let { children } = $props();
	const year = new Date().getFullYear();
	let sidebarOpen = $state(false);

	const navigation = [
		{ name: 'Dashboard', href: '/dashboard', icon: Home },
		{ name: 'Clients', href: '/clients', icon: Users }
	];

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function handleLogout() {
		// Add your logout logic here
		console.log('Logging out...');
	}
</script>

<div class="flex min-h-screen bg-gray-50">
	<!-- Sidebar -->
	<div class="relative">
		<!-- Sidebar -->
		<div class=" h-full w-64 transform bg-white shadow-sm">
			<div class="flex h-16 items-center justify-between px-4">
				<h1 class="text-xl font-semibold text-gray-900">Svelte Dashboard</h1>
			</div>

			<nav class="mt-8 flex-1">
				<div class="space-y-1 px-2">
					{#each navigation as item}
						<a
							href={item.href}
							class="group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors {$page
								.url.pathname === item.href
								? 'bg-blue-100 text-blue-700'
								: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
						>
							<item.icon class="mr-3 size-5" />
							{item.name}
						</a>
					{/each}
				</div>
			</nav>

			<!-- Logout button at bottom -->
			<div class="border-t p-4">
				<Button
					variant="ghost"
					class="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					onclick={handleLogout}
				>
					<LogOut class="mr-3 h-5 w-5" />
					Logout
				</Button>
			</div>
		</div>
	</div>

	<!-- Main content -->
	<div class="flex flex-1 flex-col">
		<!-- Header -->
		<header class="border-b bg-white shadow-sm">
			<div class="flex h-16 items-center justify-between px-4">
				<div class="flex items-center">
					<h2 class="text-lg font-semibold text-gray-900">
						{#if $page.url.pathname === '/dashboard'}
							Dashboard
						{:else if $page.url.pathname === '/clients'}
							Clients
						{:else}
							Svelte Dashboard
						{/if}
					</h2>
				</div>

				<div class="flex items-center space-x-4">
					<!-- Add user menu, notifications, etc. here -->
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
						<span class="text-sm font-medium text-white">U</span>
					</div>
				</div>
			</div>
		</header>

		<!-- Main content area -->
		<main class="flex-1 overflow-auto p-6">
			<div class="mx-auto max-w-7xl">
				{@render children()}
			</div>
		</main>
	</div>
</div>
