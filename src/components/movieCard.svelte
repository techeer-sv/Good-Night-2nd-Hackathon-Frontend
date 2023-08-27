<script lang="ts">
	import { deleteMovie } from '../services/movie';
	import type { MovieData } from '../types/movie';

	export let movie: MovieData;
	export let onDelete: (id: number) => Promise<void>;
</script>

<div>
	<p>{movie.title}</p>
	<button>수정</button>
	<button on:click={() => onDelete(movie.id)}>삭제</button>
</div>
