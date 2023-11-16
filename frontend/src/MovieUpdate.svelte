<script lang="ts">
    import axios from "axios";
    import type {Movie} from "./types/Movie";
    function toIsoDateString(dateString) {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        return date.toISOString();
    }

    export let movie: Movie;
    const genres = ['스릴러', '로맨스', '코믹', '액션'];

    async function updateMovie() {
        try {
            movie.release_date = toIsoDateString(movie.release_date);
            movie.end_date = toIsoDateString(movie.end_date);
            await axios.put(`http://localhost:8080/api/v1/movies`, movie);
            alert('영화 정보가 업데이트되었습니다.');
        } catch (error) {
            console.error('영화 정보 업데이트 실패', error);
        }
    }
</script>

<form>
    <br/>
    <label>
        영화 제목:
        <input type="text" bind:value={movie.title} />
    </label>
    <br/>
    <label>
        현재 상영 여부:
        <input type="checkbox" bind:checked={movie.is_showing} />
    </label>
    <br/>
    <label>
        장르:
        <select bind:value={movie.genre}>
            {#each genres as genre}
                <option value={genre}>{genre}</option>
            {/each}
        </select>
    </label>
    <br/>
    <label>
        상영 시작일:
        <input type="date" bind:value={movie.release_date} />
    </label>
    <br/>
    <label>
        상영 종료일:
        <input type="date" bind:value={movie.end_date} />
    </label>
    <br/>
    <br/>
    <button type="button" on:click={updateMovie}>영화 업데이트</button>
</form>