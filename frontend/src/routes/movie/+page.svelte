<script lang="ts">
    import MovieList from '../../MovieList.svelte';

    const movies = [
        { title: 'Inception', year: 2010 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Interstellar', year: 2014 }
    ];
</script>

<main>
    <h1>Movie List</h1>
    <MovieList {movies} />
</main>
