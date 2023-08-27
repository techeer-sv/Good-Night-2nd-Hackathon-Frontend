import React from "react";
import { useRouter } from "next/router";
import { useFindAllMovies } from "../../api/hook/MovieHook";
import { MovieService } from "../../api/service/MovieService";
import SearchNotFoundSection from "./SearchNotFoundSection";

function MovieListSection() {
  const router = useRouter();

  const { data: movies, refetch: refetchMovie, isLoading } = useFindAllMovies();

  if (!movies || isLoading) {
    return <div>Loading...</div>;
  } else if (movies.data === null) {
    return <SearchNotFoundSection />;
  }

  const deleteMovie = async (id: number) => {
    await MovieService.deleteMovie(id).then(() => {
      refetchMovie();
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <text className="text-4xl font-bold">영화 목록</text>
        {movies?.data?.map((movie: any, index: number) => (
          <div className="flex place-content-between">
            <div
              className="cursor-pointer font-semibold"
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <text>{index + 1}. </text>
              <text>{movie.title}</text>
            </div>
            <div className="flex space-x-3">
              <text
                className="cursor-pointer text-blue-500"
                onClick={() => router.push(`/movie/edit/${movie.id}`)}
              >
                수정
              </text>
              <text
                className="cursor-pointer text-red-500"
                onClick={() => {
                  deleteMovie(movie.id);
                }}
              >
                삭제
              </text>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieListSection;
