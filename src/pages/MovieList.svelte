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
    
    let movies = [];
    let isShowing = true; // 상영 여부
    let filteredMovies = []; // 필터링된 영화 목록
    let selectedGenre = '';

    let minRating = 0;

    function filterMovies() {
        console.log("movie",movies);
        console.log("genre",selectedGenre)
        console.log("isShowing",isShowing)
        console.log("minRating",minRating)
        filteredMovies = movies.filter(movie => {
            return (
                (selectedGenre === '' || movie.genre === selectedGenre) &&
                movie.isShowing >= isShowing
            );
        });
        console.log(filteredMovies);
    }

    function handleAddMovieClick() {
        navigate('/movies/add');
    }

    function deleteMovie(movieId) {
        callApi('DELETE', "movies/" + movieId)
            .then(res => {
                moviesStore.set(movies.filter(movie => movie.id !== movieId));
            })
            .catch(err => {
                console.log(err);
            });
    }

    const unsubscribe = moviesStore.subscribe(getMovies => {
        movies = getMovies;
        filterMovies();
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div>
    <h1>영화 목록</h1>
    {#if filteredMovies.length === 0}
        <p>영화가 없습니다.</p>
    {:else}
        <ul>
            {#each filteredMovies as movie}
                <li>
                    <Link to={`/movies/detail/${movie.id}`}>{movie.title}</Link>
                    <button on:click={() => navigate(`/movies/edit/${movie.id}`)}>수정</button>
                    <button on:click={() => deleteMovie(movie.id)}>삭제</button>
                </li>
            {/each}
        </ul>
    {/if}
    
    <div class = filtering-container>
        <h3>조회 필터링</h3>
        <select class="select-genre" bind:value={selectedGenre}>
            <option value="">모든 장르</option>
            <option value="THRILLER">스릴러</option>
            <option value="ROMANCE">액션</option>
            <option value="COMIC">코믹</option>
            <option value="ACTION">로맨스</option>
    
        </select>
    
        <div class="filter-isShowing">
            <input type="checkbox" bind:checked={isShowing} /> 상영 중인 영화만 보기
        </div>
    
        <button class="add-movie-button" on:click={handleAddMovieClick}>
            영화 추가
        </button>
        <button class=search-btn on:click={filterMovies}>조회하기</button>
    </div>
    
</div>

<style>
    .filtering-container {
        display:inline-flex; 
        flex-direction: column;
        align-items: left;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .search-btn, .add-movie-button {
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #007BFF;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        text-align:center;
    }

    .search-btn:hover, .add-movie-button:hover {
        background-color: #0056b3;
    }

    .filter-isShowing {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }

    .select-genre {
        margin-top: 10px;
        padding: 5px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
    }

    li:last-child {
        border-bottom: none;
    }

    button {
        margin-left: 10px;
    }
</style>
