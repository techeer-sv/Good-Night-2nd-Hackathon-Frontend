import {writable} from 'svelte/store';
 
let initialMovies = []

const moviesStore = writable(initialMovies);

// 영화 목록
function getMovies() {
	return moviesStore;
}
// 영화 추가
function addMovie(movie){
	moviesStore.update(movies => {
		return[...movies, movie];
	});
}

// 영화 수정
function editMovie(updatedMovie) {
	moviesStore.update(movies => {
			return movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie);
	});
}

// 영화 삭제
function deleteMovie(movieId) {
	moviesStore.update(movies => {
			return movies.filter(movie => movie.id !== movieId);
	});
}

export default moviesStore;
export {getMovies, addMovie, editMovie, deleteMovie};