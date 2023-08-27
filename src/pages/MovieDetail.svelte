<script>
    import { onMount } from 'svelte';
    import { callApi } from "../services/api.js";
    import { Link, navigate } from 'svelte-routing';
  
    export let id;

    let movie = null;
    let reviews = [];

    onMount(async () => {
        try {
            const response = await callApi('GET', `/movies/${id}`);
            movie = response.data;

            const reviewResponse = await callApi('GET', `/reviews/movie/${id}`);
            reviews = reviewResponse.data;
        } catch (error) {
            console.error("Error fetching movie details and reviews:", error);
        }
    });

    function calculateAverageRating(reviews) {
        if (reviews.length === 0) return null;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    }
</script>

{#if movie}
    <div class="movie-detail">
        <h2>{movie.title}</h2>
        <p>장르: {movie.genre}</p>
        <p>상영 시작 날짜: {movie.releaseDate}</p>
        <p>상영 종료 날짜: {movie.endDate}</p>
        {#if movie.isShowing}
            <p>상영 여부: 상영 중</p>
        {:else}
            <p>상영 여부: 상영 종료</p>
        {/if}

        {#if reviews.length > 0}
            <p>평점: {calculateAverageRating(reviews)}</p>
        {:else}
            <p>평점: 없음</p>
        {/if}
        
        {#if reviews.length === 0}
            <p class = "noreview">존재하는 리뷰가 없습니다.</p>
        {:else}
            <div class="reviews">
                <h3>리뷰</h3>
                {#each reviews as review}
                    <div class="review">
                        <p>평점: {review.rating}</p>
                        <p>{review.content}</p>
                        <hr>
                    </div>
                {/each}
            </div>
        {/if}
        
    </div>
    <button>
        <Link to="/movies">목록으로</Link>
    </button>
    <button on:click={() => navigate(`/movies/${id}/review`)}>리뷰 작성하기</button>
{:else}
    <p>Loading...</p>
{/if}

<style>
    .noreview{
        color: #fc0000;
        font-style: italic;
        font-size: large;
        font-weight: bold;
    }
    .movie-detail {
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
    }

    .reviews {
        margin-top: 20px;
    }

    .review {
        margin-bottom: 20px;
    }

    .review hr {
        border: 0.5px solid #e0e0e0;
    }
</style>
