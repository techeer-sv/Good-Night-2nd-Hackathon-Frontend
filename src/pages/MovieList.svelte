<script>
    import { Router, Route, Link, navigate } from 'svelte-routing';
    import MovieAdd from "./MovieAdd.svelte";

    function handleAddMovieClick() {
        navigate('/movies/add');
    }
</script>

<div>
    <h1>영화 목록</h1>
    <p>영화 목록을 출력합니다.</p>
    <button class="add-movie-button" on:click={handleAddMovieClick}>
        영화 추가
    </button>
</div>

<style>
    .add-movie-button {
        display: inline-block;
        margin-right: 10px;
        padding: 10px 15px;
        background-color: #007BFF;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s;
    }

    .add-movie-button:hover {
        background-color: #0056b3;
    }
</style>
