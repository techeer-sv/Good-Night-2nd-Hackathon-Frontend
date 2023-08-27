<script lang="ts">
    // TypeScript 타입 정의
    import {onMount} from "svelte";

    interface Movie {
        id: number
        title: string
        genre: string
        isShowing: boolean
        releasedAt: string
        endAt: string
        createdAt: string
        updatedAt: string
    }

    let movies: Movie[] = [];
    let changeId: number = 0;

    async function fetchMovies(message?: any) {
        try {
            const response = await fetch("http://localhost:8080/api/v1/movies?genre=&isShowing=");
            if (!response.ok) {
                throw new Error("API 요청이 실패했습니다.");
            }
            movies = await response.json();
        } catch (error) {
            alert.apply("데이터를 가져오는 동안 오류가 발생했습니다:");
        }
    }

    onMount(fetchMovies); // 컴포넌트가 로드될 때 데이터 가져오기 시도

    async function postMovie(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:8080/api/v1/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: body.title.toString(),
                    genre: body.genre.toString(),
                    releasedAt: body.releasedAt + "T00:00:00.000Z",
                    endAt: body.endAt + "T00:00:00.000Z"
                })
            });
            if (!response.ok) {
                throw new Error("API 요청이 실패했습니다.");
            }
            await fetchMovies();
        } catch (error) {
            alert.apply("영화 생성에 실패했습니다.");
        }
    }

    async function putMovie(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`http://localhost:8080/api/v1/movies/${Number(body.id)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: body.title.toString(),
                    genre: body.genre.toString(),
                    releasedAt: body.releasedAt + "T00:00:00.000Z",
                    endAt: body.endAt + "T00:00:00.000Z"
                })
            });
            if (!response.ok) {
                throw new Error("API 요청이 실패했습니다.");
            }
            await fetchMovies();
        } catch (error) {
            alert.apply("영화 수정에 실패했습니다.");
        }
        changeId = 0;
    }

    async function deleteMovie(id: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/movies/${Number(id)}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("API 요청이 실패했습니다.");
            }
            await fetchMovies();
        } catch (error) {
            alert.apply("영화 삭제에 실패했습니다.");
        }
        changeId = 0;
    }

</script>

<main>
    <h1>영화 생성</h1>
    <form on:submit={postMovie}>
        <label>
            영화 제목
            <input type="text" name="title" placeholder="영화 제목" required>
        </label><br/>
        <label>
            영화 장르
            <input type="text" name="genre" placeholder="영화 장르" required>
        </label><br/>
        <label>
            개봉일
            <input type="date" name="releasedAt" required>
        </label><br/>
        <label>
            종영일
            <input type="date" name="endAt" required>
        </label><br/>
        <button type="submit">영화 생성</button>

    </form>

    <h1>영화 목록</h1>
    {#if movies.length > 0}
        {#each movies as movie}
            {#if changeId === movie.id}
                <form on:submit={putMovie}>
                    <input type="hidden" name="id" value={movie.id}/>
                    <ul>
                        <li>제목 : <input type="text" name="title" value={movie.title}/></li>
                        <li>장르 : <input type="text" name="genre" value={movie.genre}/></li>
                        <li>개봉일 : <input type="date" name="releasedAt"
                                         value={String(movie.releasedAt).slice(0, 10)}/></li>
                        <li>종영일 : <input type="date" name="endAt" value={String(movie.endAt).slice(0, 10)}/></li>
                        <li>
                            <button type="submit">수정</button>
                        </li>
                        <li>
                            <button on:click={() => changeId = 0}>수정 취소</button>
                        </li>
                    </ul>
                </form>
                <br/>
            {:else}
                <ul>

                    <li>제목 :  {movie.title}</li>
                    <li>장르 : {movie.genre}</li>
                    <li>상영중 : {Boolean(movie.isShowing) ? "상영중" : "상영 종료"}</li>
                    <li>개봉일 : {String(movie.releasedAt).slice(0, 10)}</li>
                    <li>종영일 : {String(movie.endAt).slice(0, 10)}</li>
                    <li><a href="/movie/{movie.id}">
                        <button>리뷰 보기</button>
                    </a></li>
                    <li>
                        <button on:click={() => changeId = movie.id}>수정 하기</button>
                    </li>
                    <li>
                        <button on:click={() => deleteMovie(movie.id)}>삭제 하기</button>
                    </li>
                    <br/>
                </ul>

            {/if}
        {/each}
    {:else}
        <p>영화 데이터가 없습니다.</p>
    {/if}
</main>

<style>
    /* 스타일링을 위한 CSS 코드 작성 */
</style>
