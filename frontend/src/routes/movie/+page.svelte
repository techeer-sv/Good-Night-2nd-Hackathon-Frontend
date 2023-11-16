<script lang="ts">
    import MovieList from '../../MovieList.svelte';
    import {onMount} from "svelte";
    import axios from "axios";
    import type {Movie} from "../../types/Movie";
    import MovieAdd from "../../MovieAdd.svelte";

    let movies: Movie[] = [];

    let showMovieAdd = false;
    let modal;

    function toggleMovieAdd() {
        showMovieAdd = !showMovieAdd;
        modal.style.display = showMovieAdd ? 'block' : 'none';
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
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 40%; /* Could be more or less, depending on screen size */
    }

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
    .close-button {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close-button:hover,
    .close-button:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
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
    <div class="modal" bind:this={modal}>
        <div class="modal-content">
            <span class="close-button" on:click={toggleMovieAdd}>&times;</span>
            {#if showMovieAdd}
                <MovieAdd />
            {/if}
        </div>
    </div>
</div>

<MovieList {movies} />

<footer class="footer">
    <p>Copyright © 2023 Seyeoncinema. All rights reserved.</p>
</footer>
