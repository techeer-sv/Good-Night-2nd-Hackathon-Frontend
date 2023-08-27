<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteMovie } from '../services/movie';
	import type { MovieData } from '../types/movie';

	export let movie: MovieData;
	export let onDelete: (id: number) => Promise<void>;

	const goToEditPage = () => {
		goto(`/movieEdit/${movie.id}`);
	};
</script>

<div>
	<p>{movie.title}</p>
	<button on:click={goToEditPage}>수정</button>
	<button on:click={() => onDelete(movie.id)}>삭제</button>
</div>
