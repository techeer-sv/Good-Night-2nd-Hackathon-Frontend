<script lang="ts">
    import {onMount} from "svelte";
    import axios from "axios";
    import type {Movie} from "../../../types/Movie";
    import type {Review} from "../../../types/Review";

    let movie: Movie = {
        id: 0,
        title: "",
        is_showing: false,
        genre: "",
        release_date: "",
        end_date: "",
    };

    let reviews: Review[] = []
    export let data: { id: number };

    onMount(async () => {
        try {
            const { data: responseData } = await axios.get<Movie>(`http://localhost:8080/api/v1/movies/${data.id}`);
            console.log(responseData)
            movie = responseData.data
        } catch (error) {
            console.error('영화 조회 실패', error);
        }
    });

    onMount(async () => {
        try {
            const { data: responseData } = await axios.get<Review[]>(`http://localhost:8080/api/v1/movies/${data.id}/reviews`);
            console.log(responseData)
            reviews = responseData.data
        } catch (error) {
            console.error('리뷰 조회 실패', error);
        }
    });
</script>

<ul>
    <li>
        <h3><span>{movie.title}</span></h3>
        <h4>현재 상영 여부</h4>
        <span>{movie.is_showing}</span>
        <h4>장르</h4>
        <span>{movie.genre}</span>
        <h4>상영 시작일</h4>
        <span>{movie.release_date}</span>
        <h4>상영 종료일</h4>
        <span>{movie.end_date}</span>
    </li>
</ul>
<ul>
    {#each reviews as review}
    <li>
        <h3><span>{review.content}</span></h3>
        <span>{review.rating}</span>
    </li>
    {/each}
</ul>
