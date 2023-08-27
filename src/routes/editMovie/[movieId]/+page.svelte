<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let movieId = JSON.stringify(Number($page.params.movieId));
	let movieDetails = null;

	let isEditing = {
		title: false,
		genre: false,
		isShowing: false,
		releasedAt: false,
		endAt: false
	};

	function formatDate(dateString) {
		const date = new Date(dateString);
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
			date.getDate()
		).padStart(2, '0')}`;
	}

	async function updateMovie() {
		const requestBody = {
			title: movieDetails.title,
			genre: movieDetails.genre,
			releasedAt: new Date(movieDetails.releasedAt).toISOString(),
			endAt: new Date(movieDetails.endAt).toISOString()
		};

		try {
			const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (response.ok) {
				// Reset editing state after successful update
				isEditing = {
					title: false,
					genre: false,
					isShowing: false,
					releasedAt: false,
					endAt: false
				};
			} else {
				console.error('Failed to update movie:', response.statusText);
			}
		} catch (error) {
			console.error('Update error:', error.message);
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
				} else {
					console.error('Failed to fetch movie details:', response.statusText);
				}
			} catch (error) {
				console.error('Fetch error:', error.message);
			}
		}
	});
</script>

<!-- Movie Details -->
{#if movieDetails}
	<h1>
		{#if isEditing.title}
			<input bind:value={movieDetails.title} />
		{:else}
			{movieDetails.title}
		{/if}
		<button
			on:click={() => {
				isEditing.title ? updateMovie() : (isEditing.title = true);
			}}>{isEditing.title ? '수정 완료' : '수정'}</button
		>
	</h1>
	<p>
		장르:
		{#if isEditing.genre}
			<input bind:value={movieDetails.genre} />
		{:else}
			{movieDetails.genre}
		{/if}
		<button
			on:click={() => {
				isEditing.genre ? updateMovie() : (isEditing.genre = true);
			}}>{isEditing.genre ? '수정 완료' : '수정'}</button
		>
	</p>

	<p>
		상태:
		{#if isEditing.isShowing}
			<select bind:value={movieDetails.isShowing}>
				<option value={true}>상영중</option>
				<option value={false}>상영 종료</option>
			</select>
		{:else}
			{movieDetails.isShowing ? '상영중' : '상영 종료'}
		{/if}
		<button
			on:click={() => {
				isEditing.isShowing ? updateMovie() : (isEditing.isShowing = true);
			}}>{isEditing.isShowing ? '수정 완료' : '수정'}</button
		>
	</p>

	<p>
		개봉 날짜:
		{#if isEditing.releasedAt}
			<input type="date" bind:value={movieDetails.releasedAt} />
		{:else}
			{movieDetails.releasedAt}
		{/if}
		<button
			on:click={() => {
				isEditing.releasedAt ? updateMovie() : (isEditing.releasedAt = true);
			}}>{isEditing.releasedAt ? '수정 완료' : '수정'}</button
		>
	</p>

	{#if !movieDetails.isShowing}
		<p>
			마지막 상영 날짜:
			{#if isEditing.endAt}
				<input type="date" bind:value={movieDetails.endAt} />
			{:else}
				{movieDetails.endAt}
			{/if}
			<button
				on:click={() => {
					isEditing.endAt ? updateMovie() : (isEditing.endAt = true);
				}}>{isEditing.endAt ? '수정 완료' : '수정'}</button
			>
		</p>
	{/if}
{:else}
	<p>Loading...</p>
{/if}

<style>
	/* 필요한 스타일을 여기에 추가하세요. */
</style>
