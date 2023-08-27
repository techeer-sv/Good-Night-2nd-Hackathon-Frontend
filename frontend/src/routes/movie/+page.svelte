<script lang="ts">
    import MovieList from '../../MovieList.svelte';
    import {onMount} from "svelte";
    import axios from "axios";
    import type {Movie} from "../../types/Movie";
    import MovieAdd from "../../MovieAdd.svelte";

    let movies: Movie[] = [];

    let showMovieAdd = false;

    function toggleMovieAdd() {
        showMovieAdd = !showMovieAdd;
    }

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
<style>
    button {
        padding: 10px 20px;
        margin: 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    button:hover {
        background-color: #f2f2f2;
    }

    nav > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
    }
    .btn-movieAdd {
        display: flex;
        justify-content: flex-end;
    }
    .btn-movieAdd button {
        background-color: #4CAF50;
        color: white;
    }
    .footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1rem;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
<nav>
    <div>
        <h1>Seyeoncinema Movie List</h1>
    </div>
</nav>
<div class="btn-movieAdd">
    <button on:click={toggleMovieAdd}>영화 추가</button>
    {#if showMovieAdd}
        <MovieAdd />
    {/if}
</div>

<MovieList {movies} />
    <br />

<footer class="footer">
    <p>Copyright © 2023 Seyeoncinema. All rights reserved.</p>
</footer>
