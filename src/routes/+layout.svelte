<body class="container">
	<nav class="navbar" />
	<main class="content"><slot /></main>
	<footer class="footer" />
</body>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
	}
	.navbar {
		width: 100%;
		height: 80px;
		background-color: red;
	}
	.content {
		flex-grow: 1;
	}
	.footer {
		width: 100%;
		height: 50px;
		background-color: blue;
	}
</style>
