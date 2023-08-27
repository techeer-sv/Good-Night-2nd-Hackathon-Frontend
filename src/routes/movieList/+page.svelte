<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { MoiveData } from '../../types/movie';
	import { deleteMovie, getMovies } from '../../services/movie';
	import MovieCard from '../../components/movieCard.svelte';

	const goToEnrollPage = () => {
		goto('/movieEnroll');
	};
	let movieList: MoiveData[] = [];

	const onDelete = async (id: number) => {
		await deleteMovie(id);
		movieList = movieList.filter((movie) => movie.id !== id);
	};

	onMount(async () => {
		movieList = await getMovies();
	});
</script>

<div>
	<button on:click={goToEnrollPage}>영화 등록 페이지 이동</button>
	{#each movieList as movie}
		<MovieCard {movie} {onDelete} />
	{/each}
</div>
