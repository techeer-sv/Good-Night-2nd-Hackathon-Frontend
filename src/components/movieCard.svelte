<script lang="ts">
	import { deleteMovie } from '../services/movie';
	import type { MoiveData } from '../types/movie';

	export let movie: MoiveData;
	export let onDelete: (id: number) => Promise<void>;
</script>

<div>
	<p>{movie.title}</p>
	<button>수정</button>
	<button on:click={() => onDelete(movie.id)}>삭제</button>
</div>
