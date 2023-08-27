<script lang="ts">
    import type {Movie} from "./types/Movie";

    export let movies: Movie[];

    const selectMovie = (movie: Movie) => {
        alert(`You selected ${movie.title}`);
    };

</script>

{#each movies as movie}
    <div role="button"
         tabindex="0"
         on:click={() => selectMovie(movie)}
         on:keydown={(e) => { if (e.key === 'Enter') selectMovie(movie); }}>
        {movie.title}
    </div>
{/each}