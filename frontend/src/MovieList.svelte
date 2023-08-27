<script lang="ts">
    import type {Movie} from "./types/Movie";
    import {goto} from "$app/navigation";
    import MovieUpdate from "./MovieUpdate.svelte";

    export let movies: Movie[];

    let showMovieUpdate = {}; // 각 movie.id를 키로 가지는 객체를 생성

    function toggleMovieUpdate(movieId) {
        showMovieUpdate[movieId] = !showMovieUpdate[movieId];
    }
</script>

<style>
    .movie-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }
    .movie-item {
        padding: 16px;
        border: 1px solid #ccc;
        text-align: center;
    }
</style>

<div class="movie-container">
    {#each movies as movie}
        <div class="movie-wrap">
            <div class="movie-item" role="button" tabindex="0"
                 on:click={() => goto(`/movie/${movie.id}`)}
                 on:keydown={(e) => { if (e.key === 'Enter') goto(`/movie/${movie.id}`)}}>
                <h3>{movie.title}</h3>
            </div>
            <div class="movie-actions">
                <button on:click={() => toggleMovieUpdate(movie.id)}>수정</button>
                {#if showMovieUpdate[movie.id]}
                    <MovieUpdate movie={movie}/>
                {/if}
            </div>
        </div>
    {/each}
</div>
