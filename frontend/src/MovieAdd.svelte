<script lang="ts">

    import axios from "axios";
    import type {MovieAdd} from "./types/Movie";

    const today = new Date().toISOString().split('T')[0];
    function toIsoDateString(dateString) {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        return date.toISOString();
    }

    let movie: MovieAdd = {
        is_showing: false,
        title: '',
        genre: '코믹',
        release_date: today,
        end_date: today
    };

    const genres = ['스릴러', '로맨스', '코믹', '액션'];

    async function addMovie() {
        try {
            movie.release_date = toIsoDateString(movie.release_date);
            movie.end_date = toIsoDateString(movie.end_date);
            console.log(movie)
            await axios.post('http://localhost:8080/api/v1/movies', movie);
            alert("영화가 성공적으로 등록되었습니다.");
        } catch (error) {
            console.error('영화 등록 실패', error);
        }
    }

</script>

<h1>영화 등록</h1>

<input type="text" bind:value={movie.title}/>
<br/>
<select bind:value={movie.genre}>
    <option value="">장르 선택</option>
    {#each genres as genre}
        <option value={genre}>{genre}</option>
    {/each}
</select>
<br/>
<input type="date" bind:value={movie.release_date}/>
<br/>
<input type="date" bind:value={movie.end_date}/>
<br/>
<br/>
<button on:click={addMovie}>영화 등록</button>