<script>
  import { Router, Route, Link } from 'svelte-routing';
  import MovieList from './pages/MovieList.svelte';
  import MovieAdd from './pages/MovieAdd.svelte';
</script>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/movies">Movies</Link>
    <Link to="/movies/add">Add Movie</Link>
  </nav>
  <Route path="/movies" component={MovieList} />
  <Route path="/movies/add" component={MovieAdd} />
</Router>
