<script>
  import { Router, Route, Link } from 'svelte-routing';
  import MovieList from './pages/MovieList.svelte';
  import MovieAdd from './pages/MovieAdd.svelte';
  import MovieEdit from "./pages/MovieEdit.svelte";
  import MovieDetail from "./pages/MovieDetail.svelte";
  import Review from './pages/Review.svelte';
</script>

<Router>
  <nav>
    <Link to="/movies">Movies</Link>
  </nav>
  <Route path="/movies" component={MovieList} />
  <Route path="/movies/add" component={MovieAdd} />
  <Route path="/movies/edit/:movieId" component={MovieEdit} />
  <Route path="/movies/detail/:id" component={MovieDetail} />
  <Route path="/movies/:id/review" component={Review} />
</Router>
