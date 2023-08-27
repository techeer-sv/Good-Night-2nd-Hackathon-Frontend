<script lang="ts">
    import type {Movie} from "./types/Movie";
    import {goto} from "$app/navigation";
    import MovieUpdate from "./MovieUpdate.svelte";

    export let movies: Movie[];

    let showMovieUpdate = {}; // 각 movie.id를 키로 가지는 객체를 생성

    function toggleMovieUpdate(movieId) {
        showMovieUpdate[movieId] = !showMovieUpdate[movieId];
    }

    async function deleteMovie(movieId) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                movies = movies.filter(movie => movie.id !== movieId);
            } else {
                console.error('영화 삭제 실패');
            }
        } catch (error) {
            console.error('영화 삭제 실패:', error);
        }
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
                <button on:click={() => deleteMovie(movie.id)}>삭제</button>
            </div>
        </div>
    {/each}
</div>
