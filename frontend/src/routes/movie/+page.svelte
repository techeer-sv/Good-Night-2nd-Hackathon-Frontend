<script lang="ts">
    import MovieList from '../../MovieList.svelte';
    import {onMount} from "svelte";
    import axios from "axios";
    import type {Movie} from "../../types/Movie";

    let movies: Movie[] = [];


    onMount(async () => {
        try {
            const { data } = await axios.get<Movie[]>('http://localhost:8080/api/v1/movies');
            console.log(data.data)
            movies = data.data as Movie[];
        } catch (error) {
            console.error('영화 목록 조회 실패', error);
        }
    });

</script>

<main>
    <h1>Seyeoncinema Movie List</h1>
    <MovieList {movies} />
</main>
