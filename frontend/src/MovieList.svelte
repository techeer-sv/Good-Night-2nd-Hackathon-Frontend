<script lang="ts">
    export let movies: { title: string }[];

    const selectMovie = (movie: { title: string, year: number }) => {
        alert(`You selected ${movie.title}`);
    };
</script>

<ul>
    {#each movies as movie}
        <li>
            {movie.title}
            <button on:click={() => selectMovie(movie)}>Select</button>
        </li>
    {/each}
</ul>