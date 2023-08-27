<script lang="ts">
    import {onMount} from "svelte";

    export let data: { id: number }
    let isLoading = false;

    interface Review {
        id: number
        movieId: number
        comment: string
        score: number
        createdAt: string
        updatedAt: string
    }

    let reviews: Review[] = [];

    interface Movie {
        id: number
        title: string
        genre: string
        isShowing: boolean
        releasedAt: string
        endAt: string
        createdAt: string
        updatedAt: string
    }

    let movie: Movie = {
        id: data.id,
        title: "-",
        genre: "-",
        isShowing: false,
        releasedAt: "-",
        endAt: "-",
        createdAt: "-",
        updatedAt: "-"
    };

    async function fetchReviews() {
        isLoading = true;
        try {
            const response = await fetch(`http://localhost:8080/api/v1/reviews?movie_id=${data.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("API 요청이 실패했습니다.");
            }
            reviews = await response.json();
        } catch (error) {
            console.error("리뷰 데이터를 가져오는 동안 오류가 발생했습니다:");
        }
        isLoading = false;
    }

    onMount(fetchReviews); // 컴포넌트가 로드될 때 데이터 가져오기 시도

    async function fetchMovie() {
        isLoading = true;
        try {
            const response = await fetch(`http://localhost:8080/api/v1/movies/${data.id}`);
            if (!response.ok) {
                throw new Error("API 요청이 실패했습니다.");
            }
            movie = await response.json();
        } catch (error) {
            console.error("영화 데이터를 가져오는 동안 오류가 발생했습니다:" + error);
        }
        isLoading = false;
    }

    onMount(fetchMovie); // 컴포넌트가 로드될 때 데이터 가져오기 시도

    async function postReview(event: Event) {
        isLoading = true;
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:8080/api/v1/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movieID: Number(data.id),
                    score: Number(body.score),
                    comment: body.comment.toString()
                })
            });
            if (!response.ok) {
                throw new Error("API 요청이 실패했습니다.");
            }
            await fetchReviews();
        } catch (error) {
            console.error("리뷰 생성에 실패했습니다.");
        }
        isLoading = false;
    }

</script>

<main>
    <h1>{movie.title}</h1>
    <h3>장르 : {movie.genre}</h3>
    <h3>{Boolean(movie.isShowing) ? "상영중" : "상영 종료"}</h3>
    <h3>개봉일 : {String(movie.releasedAt).slice(0, 10)} ~ 종영일 : {String(movie.endAt).slice(0, 10)}</h3>

    <form on:submit={postReview}>
        <label for="comment">Comment</label>
        <input type="text" id="comment" name="comment" placeholder="comment" required>
        <label for="score">Score</label>
        <input type="number" id="score" min="1" max="5" name="score" value="5" required>
        <button type="submit">Submit</button>
        <br/>
    </form>

    <h2>Reviews</h2>
    {#if isLoading}
        <p>로딩중...</p>
    {:else}
        {#if reviews.length === 0}
            <p>리뷰가 없습니다.</p>
        {:else}
            {#each reviews as review}
                <ul>
                    <li>{review.score}점 - {review.comment}</li>
                </ul>
            {/each}
        {/if}
    {/if}

    <br/>
    <button on:click={() => window.location.href = "/"}> Back</button>

</main>