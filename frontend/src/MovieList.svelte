<script lang="ts">
    export let movies: { title: string }[];

    const selectMovie = (movie: { title: string, year: number }) => {
        alert(`You selected ${movie.title}`);
    };
</script>

<ul>
    {#each movies as movie}
        <li>
            <a href on:click={() => selectMovie(movie)}>{movie.title}</a>
        </li>
    {/each}
</ul>