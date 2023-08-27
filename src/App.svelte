<script>
  import { Router, Route, Link } from 'svelte-routing';
  import MovieList from './pages/MovieList.svelte';
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/movies">Movies</Link>
  </nav>
  <Route path="/movies" component={MovieList} />
</Router>
