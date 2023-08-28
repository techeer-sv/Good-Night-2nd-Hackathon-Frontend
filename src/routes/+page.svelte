<script>
	import { goto } from '$app/navigation';

	const startApp = () => {
		goto('/movie');
	};
</script>

<main>
	<h1>영화 리뷰 앱</h1>
	<button on:click={startApp}>시작하기!</button>
</main>
