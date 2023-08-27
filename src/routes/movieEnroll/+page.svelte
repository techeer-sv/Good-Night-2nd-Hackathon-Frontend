<script lang="ts">
	import { DateInput } from 'date-picker-svelte';
	import dayjs from 'dayjs';
	import { enrollMovie } from '../../services/enroll';

	let genre = '';
	let title = '';
	let releasedAt = new Date();
	let endAt = new Date();

	const genreMenu = ['스릴러', '로맨스', '코믹', '액션'];

	const handleEnrollMovie = async () => {
		const form = { genre, title, releasedAt: releasedAt.toISOString(), endAt: endAt.toISOString() };
		const response = await enrollMovie(form);
		console.log(response);
	};
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

	<button on:click={handleEnrollMovie}>등록하기</button>
</main>
