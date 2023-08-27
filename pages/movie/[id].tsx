import React from "react";
import Layout from "../../src/layouts/Layout";
import { useRouter } from "next/router";
import { useFindMovieById } from "../../src/api/hook/MovieHook";
import { format } from "date-fns";
import { Button } from "@nextui-org/react";

function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, isLoading } = useFindMovieById(Number(id));

  if (!movie || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="mx-10 mt-10 flex flex-col justify-center space-y-10">
        <div className="flex flex-col space-y-2">
          <text className="text-3xl font-bold text-main-1">
            {movie.data.title}
          </text>
          <text className="text-xl">{movie.data.genre}</text>
          <text className="text-2xl font-medium">
            영화 개봉일: {format(new Date(movie.data.releasedAt), "yyyy-MM-dd")}
          </text>
          <text className="text-2xl font-medium">
            영화 상영 종료일: {format(new Date(movie.data.endAt), "yyyy-MM-dd")}
          </text>
        </div>

        <Button
          className="w-full bg-red-500 font-semibold text-white"
          onClick={() => router.back()}
        >
          뒤로가기
        </Button>
      </main>
    </>
  );
}

export default MovieDetailPage;

MovieDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
