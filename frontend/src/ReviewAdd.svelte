<script lang="ts">

    import axios from "axios";
    import type {ReviewAdd} from "./types/Review";

    export let movieId: number;
    let review: ReviewAdd = {
        movie_id: 0,
        content: '',
        rating: 0
    };

    let scores = [1, 2, 3, 4, 5];
    async function addReview() {
        try {
            console.log(movieId);
            review.movie_id = Number(movieId);
            await axios.post('http://localhost:8080/api/v1/reviews', review);
            alert("리뷰가 성공적으로 등록되었습니다.");
        } catch (error) {
            console.error('리뷰 등록 실패', error);
        }
    }

</script>

<input type="text" bind:value={review.content}/>
<select bind:value={review.rating}>
    {#each scores as score}
        <option value={score}>{score}</option>
    {/each}
</select>
<button on:click={addReview}>리뷰 등록</button>