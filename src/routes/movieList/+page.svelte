<script>
	import { onMount } from 'svelte';
	import MovieItem from '../../components/movieItem.svelte';

	// @ts-ignore
	let movies = [];
	// @ts-ignore
	/**
	 * @type {any[]}
	 */
	let filteredMovies = [];
	let genreFilter = '';
	let isShowingFilter = 'all';
	let ratingFilter = 0;

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:8080/api/v1/movies');
			if (response.ok) {
				movies = await response.json();
				filteredMovies = movies;
			} else {
				console.error('Failed to fetch movies:', response.statusText);
			}
		} catch (error) {
			// @ts-ignore
			console.error('Fetch error:', error.message);
		}
	});

	function filterMovies() {
		// @ts-ignore
		filteredMovies = movies.filter((movie) => {
			const matchesGenre = genreFilter ? movie.genre === genreFilter : true;
			const matchesShowing =
				isShowingFilter === 'all' ? true : movie.isShowing.toString() === isShowingFilter;

			return matchesGenre && matchesShowing; // matchesRating 추가됨
		});
	}

	// @ts-ignore
	async function deleteMovie(movieId) {
		try {
			const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`, {
				method: 'DELETE'
			});
			if (response.ok) {
				// @ts-ignore
				filteredMovies = filteredMovies.filter((movie) => movie.id !== movieId);
			} else {
				console.error('Failed to delete movie:', response.statusText);
			}
		} catch (error) {
			// @ts-ignore
			console.error('Delete error:', error.message);
		}
	}
</script>

<h1>Movie List</h1>

<!-- Filter Section -->
<div>
	<label>
		장르:
		<select bind:value={genreFilter}>
			<option value="">-- 모든 장르 --</option>
			<option value="스릴러">스릴러</option>
			<option value="로맨스">로맨스</option>
			<option value="코믹">코믹</option>
			<option value="액션">액션</option>
		</select>
	</label>

	<label>
		상영 여부:
		<select bind:value={isShowingFilter}>
			<option value="all">-- 모든 영화 --</option>
			<option value="true">상영 중</option>
			<option value="false">상영 종료</option>
		</select>
	</label>

	<button on:click={filterMovies}>필터 적용</button>
</div>

<!-- Movie Table -->
<table>
	<thead>
		<tr>
			<th>Title</th>
			<th>Genre</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#if !filteredMovies || filteredMovies.length === 0}
			<tr>
				<td colspan="3">영화 정보가 없습니다.</td>
			</tr>
		{:else}
			{#each filteredMovies as movie (movie.id)}
				<MovieItem {movie} on:delete={(e) => deleteMovie(e.detail)} />
			{/each}
		{/if}
	</tbody>
</table>

<a href="/enrollMovie">Add New Movie</a>
