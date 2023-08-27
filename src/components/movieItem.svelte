<script>
	/**
	 * @type {{ id: number; title: string; genre: string; }}
	 */
	export let movie;
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function navigateToDetailsPage() {
		goto(`movieDetails/${movie.id}`);
	}

	function navigateToEditPage() {
		goto(`updateMovie/${movie.id}`);
	}

	function deleteItem() {
		dispatch('delete', movie.id);
	}
</script>

<tr>
	<td on:click={navigateToDetailsPage}>{movie.title}</td>
	<td>{movie.genre}</td>
	<td>
		<button on:click={navigateToEditPage}>Edit</button>
		<button on:click={deleteItem}>Delete</button>
	</td>
</tr>
