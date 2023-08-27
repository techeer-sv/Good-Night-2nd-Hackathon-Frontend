<script lang="ts">
    import type {Movie} from "./types/Movie";

    export let movies: Movie[];

    const selectMovie = (movie: Movie) => {
        alert(`You selected ${movie.title}`);
    };

</script>

<!--<ul>-->
<!--    {#each movies as movie}-->
<!--        <li class="movie-list-item" role="button" tabindex="0"-->
<!--            on:click={() => selectMovie(movie)}-->
<!--            on:keydown={(e) => { if (e.key === 'Enter') selectMovie(movie); }}>-->
<!--            <span>{movie.title}</span>-->
<!--        </li>-->
<!--    {/each}-->
<!--</ul>-->

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
             on:click={() => selectMovie(movie)}
             on:keydown={(e) => { if (e.key === 'Enter') selectMovie(movie); }}>
            <h3>{movie.title}</h3>
        </div>
    {/each}
</div>