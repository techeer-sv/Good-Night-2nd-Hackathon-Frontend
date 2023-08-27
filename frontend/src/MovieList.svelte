<script lang="ts">
    import type {Movie} from "./types/Movie";
    import {goto} from "$app/navigation";

    export let movies: Movie[];

</script>

<style>
    .movie-grid {
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

<div class="movie-grid">
    {#each movies as movie}
        <div class="movie-item" role="button" tabindex="0"
             on:click={() => goto(`/movie/${movie.id}`)}
             on:keydown={(e) => { if (e.key === 'Enter') goto(`/movie/${movie.id}`)}}>
            <h3>{movie.title}</h3>
        </div>
    {/each}
</div>