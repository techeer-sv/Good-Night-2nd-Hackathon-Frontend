<script>
    import { Router, Route, Link, navigate } from 'svelte-routing';
    import MovieAdd from "./MovieAdd.svelte";
    import {callApi} from "../services/api.js";
    import moviesStore from '../store/movies.js';
    import { onDestroy } from 'svelte';
    callApi('GET', '/movies')
        .then(res => {
            moviesStore.set(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    
    function handleAddMovieClick() {
        navigate('/movies/add');
    }
    let movies = [];

    let selectedGenre = '';

    let minRating = 0;
    let currentPage = 1;
    let totalPages = 10;  // 예시 값, 실제로는 백엔드에서 받아와야 합니다.

    const unsubscribe = moviesStore.subscribe(getMovies => {
        movies = getMovies;
    });
    function deleteMovie(movieId) {
        callApi('DELETE',"movies/"+movieId)
            .then(res => {
                moviesStore.set(movies.filter(movie => movie.id !== movieId));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function changePage(page) {
        currentPage = page;
        // 페이지가 변경될 때마다 새로운 영화 목록을 불러와야 합니다.
    }
    onDestroy(() => {
        unsubscribe();
    });
</script>

<div>
    <h1>영화 목록</h1>
    {#if movies.length === 0}
        <p>영화가 없습니다.</p>
    {:else}
        <ul>
            {#each movies as movie}
                <li>
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    <button on:click={() => navigate(`/movies/edit/${movie.id}`)}>수정</button>
                    <button on:click={() => deleteMovie(movie.id)}>삭제</button>
                </li>
            {/each}
        </ul>
    {/if}
    
    <!-- 필터링 기능 (간략한 예시) -->
    <select bind:value={selectedGenre}>
        <option value="">모든 장르</option>
        <!-- 장르 목록을 동적으로 불러와야 합니다. -->
        <option value="스릴러">스릴러</option>
        <option value="액션">액션</option>
        <option value="코믹">코믹</option>
        <option value="로맨스">로맨스</option>
        <!-- ... -->
    </select>

    <input type="number" bind:value={minRating} placeholder="최소 평점" />

    <!-- 페이지네이션 (간략한 예시) -->
    <button on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}>이전</button>
    <span>{currentPage}</span>
    <button on:click={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>다음</button>

</div>
<button class="add-movie-button" on:click={handleAddMovieClick}>
    영화 추가
</button>
<style>
    .add-movie-button {
    position: fixed; /* 고정 위치 */
    bottom: 10px; /* 하단에서 10px 떨어진 위치 */
    right: 10px; /* 오른쪽에서 10px 떨어진 위치 */
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
