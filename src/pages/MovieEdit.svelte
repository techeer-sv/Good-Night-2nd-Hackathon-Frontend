<script>
    import { onMount } from 'svelte';
    import { callApi } from '../services/api.js';
    import Dropdown from '../components/Dropdown.svelte';
    import { DateInput } from 'date-picker-svelte';

    export let movieId;
    
    let movie = {};
    let selectedGenre = '';
    let releaseDate = new Date();
    let endDate = new Date();
    console.log("movie id : ",movieId);
    onMount(async () => {
        try {
            const response = await callApi('GET', `/movies/${movieId}`);
            movie = response.data;
            selectedGenre = movie.genre;
            releaseDate = new Date(movie.releaseDate);
            endDate = new Date(movie.endDate);
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    });

    function updateMovie() {
        const updatedMovie = {
            ...movie,
            genre: selectedGenre,
            releaseDate: releaseDate.toISOString(),
            endDate: endDate.toISOString()
            
        };

        callApi('PUT', `/movies/${movieId}`, updatedMovie)
            .then(() => {
                console.log("Movie updated successfully!");
                // 여기서 다른 페이지로 리다이렉트하거나, 성공 메시지를 표시할 수 있습니다.
            })
            .catch(err => {
                console.error("Error updating movie:", err);
            });
    }
</script>

<h2>영화 정보 수정</h2>

<div>
    <label>
        제목:
        <input type="text" bind:value={movie.title} />
    </label>
</div>

<div>
    <Dropdown bind:selectedGenre={selectedGenre} />
</div>

<div>
    <label>
        상영 시작 날짜:
        <DateInput bind:value={releaseDate} format={"yyyy-MM-dd"} />
    </label>
</div>

<div>
    <label>
        상영 종료 날짜:
        <DateInput bind:value={endDate} format={"yyyy-MM-dd"} />
    </label>
</div>

<button on:click={updateMovie}>수정하기</button>
