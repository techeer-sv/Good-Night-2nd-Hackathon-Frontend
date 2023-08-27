<script lang="ts">
	import { onMount } from 'svelte';
	import type { MovieData } from '../../../types/movie';
	import { getMovie } from '../../../services/movie';
	import type { ReviewData, ReviewForm } from '../../../types/review';
	import { getReviews, submitReview } from '../../../services/review';

	export let data: { id: number };

	let movie: MovieData = {
		title: '',
		createdAt: '',
		endAt: '',
		genre: '',
		id: 0,
		isShowing: false,
		releasedAt: '',
		updatedAt: ''
	};
	let reviews: ReviewData[] = [];

	let score = 5;
	const scoreOptions = [1, 2, 3, 4, 5];

	let comment = '';

	const onSubmitReview = async () => {
		const form: ReviewForm = {
			comment,
			movieID: Number(data.id),
			score
		};
		const review = await submitReview(form);
		if (review) {
			alert('리뷰가 등록되었습니다.');
			reviews = [...reviews, review];
			comment = '';
			score = 5;
		} else {
			alert('리뷰 등록에 실패했습니다.');
		}
	};

	onMount(async () => {
		movie = await getMovie(data.id);
		reviews = await getReviews();
	});
</script>

<div>
	<h1>{movie.title}</h1>
	<form on:submit={onSubmitReview}>
		<select bind:value={score}>
			{#each scoreOptions as scoreOption}
				<option value={scoreOption}>{scoreOption}</option>
			{/each}
		</select>
		<input bind:value={comment} />
		<button type="submit">평점 남기기</button>
	</form>
	<ul>
		{#if reviews && reviews.length > 0}
			{#each reviews as review}
				<li>
					<p>{review.comment}</p>
					<p>{review.score}</p>
				</li>
			{/each}
		{:else}
			<h3>리뷰가 없습니다.</h3>
		{/if}
	</ul>
</div>
