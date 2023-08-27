<script>
	let title = '';
	let genre = '';
	let releasedAt = '';
	let endAt = '';
	let errorMessage = '';

	async function enroll() {
		if (!title || !genre || !releasedAt || !endAt) {
			errorMessage = '모든 필드를 채워주세요!';
			return;
		}

		const payload = {
			title,
			genre,
			releasedAt: new Date(releasedAt).toISOString(),
			endAt: new Date(endAt).toISOString()
		};

		try {
			const response = await fetch('http://localhost:8080/api/v1/movies', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				// 영화 등록이 성공적으로 완료된 경우
				errorMessage = '영화가 성공적으로 등록되었습니다.';
				console.log('영화 등록 성공');
				const data = await response.json();
				console.log(data);
			} else {
				// API 응답에 문제가 있을 경우
				errorMessage = '영화 등록에 문제가 발생했습니다.';
			}
		} catch (error) {
			// 네트워크 오류 또는 기타 예외 처리
			// @ts-ignore
			errorMessage = 'API 호출 중 오류가 발생했습니다: ' + error.message;
		}
	}
</script>

<h1>Enroll Movie</h1>

<div>
	<label>
		영화 제목:
		<input type="text" bind:value={title} placeholder="영화 제목을 입력하세요" />
	</label>
</div>

<div>
	<label>
		장르:
		<select bind:value={genre}>
			<option value="">-- 장르를 선택하세요 --</option>
			<option value="스릴러">스릴러</option>
			<option value="로맨스">로맨스</option>
			<option value="코믹">코믹</option>
			<option value="액션">액션</option>
		</select>
	</label>
</div>

<div>
	<label>
		개봉일:
		<input type="date" bind:value={releasedAt} />
	</label>
</div>

<div>
	<label>
		상영 종료일:
		<input type="date" bind:value={endAt} />
	</label>
</div>

<button on:click={enroll}>영화 등록</button>

{#if errorMessage}
	<p style="color: red;">{errorMessage}</p>
{/if}

<a href="/">Home</a>
