<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteMovie } from '../services/movie';
	import type { MovieData } from '../types/movie';

	export let movie: MovieData;
	export let onDelete: (id: number) => Promise<void>;

	const goToEditPage = () => {
		goto(`/movieEdit/${movie.id}`);
	};
	const goToDetailPage = () => {
		goto(`/movie/${movie.id}`);
	};
</script>

<div>
	<section role="presentation" on:click={goToDetailPage}>
		<p>{movie.title}</p>
	</section>
	<span>
		<button on:click={goToEditPage}>수정</button>
		<button on:click={() => onDelete(movie.id)}>삭제</button>
	</span>
</div>
