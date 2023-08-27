import React from "react";
import { useRouter } from "next/router";
import { useFindAllMovies } from "../../api/hook/MovieHook";

function MovieListSection() {
  const router = useRouter();

  const { data: movies, isLoading } = useFindAllMovies();

  if (!movies && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col space-y-5">
        <text className="text-4xl font-bold">영화 목록</text>
        {movies?.data.map((movie: any, index: number) => (
          <div
            className="cursor-pointer font-semibold"
            onClick={() => router.push(`/movie/${movie.id}`)}
          >
            <text>{index + 1}.</text>
            <text>{movie.title}</text>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieListSection;
