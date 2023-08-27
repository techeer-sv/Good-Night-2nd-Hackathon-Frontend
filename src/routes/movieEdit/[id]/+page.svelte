<script lang="ts">
	import { DateInput } from 'date-picker-svelte';
	import dayjs from 'dayjs';
	import { editMovie, getMovie } from '../../../services/movie';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: { id: number };

	let genre = '';
	let title = '';
	let releasedAt = new Date();
	let endAt = new Date();

	const genreMenu = ['스릴러', '로맨스', '코믹', '액션'];

	const handleEditMovie = async () => {
		const form = { genre, title, releasedAt: releasedAt.toISOString(), endAt: endAt.toISOString() };
		const response = await editMovie(data.id, form);
		if (response) {
			alert('영화가 수정되었습니다.');
			goto('/movie');
		}
	};

	onMount(async () => {
		const movieData = await getMovie(data.id);
		genre = movieData.genre;
		title = movieData.title;
		releasedAt = new Date(movieData.releasedAt);
		endAt = new Date(movieData.endAt);
	});
</script>

<main>
	<section>
		<h2>제목 입력</h2>
		<input bind:value={title} />
	</section>

	<section>
		<h2>장르 선택</h2>
		<select bind:value={genre}>
			{#each genreMenu as genreOption}
				<option value={genreOption}>{genreOption}</option>
			{/each}
		</select>
	</section>

	<section>
		<h2>개봉일 입력</h2>
		<DateInput bind:value={releasedAt} />
		<p>{dayjs(releasedAt).format('YYYY-MM-DD')}</p>
	</section>

	<section>
		<h2>상영 종료일 입력</h2>
		<DateInput bind:value={endAt} />
		<p>{dayjs(endAt).format('YYYY-MM-DD')}</p>
	</section>

	<button on:click={handleEditMovie}>수정하기</button>
</main>
