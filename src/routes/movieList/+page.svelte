<script>
	import { goto } from '$app/navigation';

	const goToEnrollPage = () => {
		goto('/movieEnroll');
	};
</script>

<div>
	<button on:click={goToEnrollPage}>영화 등록 페이지 이동</button>
</div>
