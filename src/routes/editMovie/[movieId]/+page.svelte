<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let movieId = JSON.stringify(Number($page.params.movieId));
	let movieDetails = null;
	let reviews = [];
	let newReview = '';
	let newRating = 1;

	function formatDate(dateString) {
		const date = new Date(dateString);
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
			date.getDate()
		).padStart(2, '0')}`;
	}

	async function fetchReviews() {
		try {
			const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}/reviews`);
			if (response.ok) {
				reviews = await response.json();
			}
		} catch (err) {
			console.error('Failed to fetch reviews:', err);
		}
	}

	async function submitReview() {
		if (newReview.trim() && newRating >= 1 && newRating <= 5) {
			try {
				const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}/reviews`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ review: newReview, rating: newRating })
				});

				if (response.ok) {
					fetchReviews();
					newReview = '';
				}
			} catch (err) {
				console.error('Failed to submit review:', err);
			}
		}
	}

	onMount(async () => {
		if (movieId) {
			try {
				const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`);
				if (response.ok) {
					movieDetails = await response.json();
					movieDetails.releasedAt = formatDate(movieDetails.releasedAt);
					if (movieDetails.endAt) {
						movieDetails.endAt = formatDate(movieDetails.endAt);
					}
				}
			} catch (error) {
				console.error('Fetch error:', error.message);
			}
			fetchReviews();
		}
	});
</script>

<!-- Movie Details -->
{#if movieDetails}
	<h1>{movieDetails.title}</h1>
	<p>장르: {movieDetails.genre}</p>
	<p>상태: {movieDetails.isShowing ? '상영중' : '상영 종료'}</p>
	<p>개봉 날짜: {movieDetails.releasedAt}</p>
	{#if !movieDetails.isShowing}
		<p>마지막 상영 날짜: {movieDetails.endAt}</p>
	{/if}
{:else}
	<p>Loading...</p>
{/if}

<!-- Review Submission -->
<h2>리뷰 등록</h2>
<select bind:value={newRating}>
	{#each [1, 2, 3, 4, 5] as rating}
		<option value={rating}>{rating}점</option>
	{/each}
</select>
<textarea bind:value={newReview} placeholder="리뷰를 입력하세요." />
<button on:click={submitReview}>리뷰 등록</button>

<!-- Review List -->
<h2>리뷰 목록</h2>
<ul>
	{#each reviews as review}
		<li>
			<strong>{review.rating}점</strong> - {review.content}
		</li>
	{/each}
</ul>

<style>
	/* 필요한 스타일을 여기에 추가하세요. */
</style>
