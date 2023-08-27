import React from "react";
import Layout from "../../src/layouts/Layout";
import { useRouter } from "next/router";
import { useFindMovieById } from "../../src/api/hook/MovieHook";
import { format } from "date-fns";
import { Button } from "@nextui-org/react";
import { useAddReview } from "../../src/api/hook/ReviewHook";

function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, isLoading } = useFindMovieById(Number(id));

  const [comment, setComment] = React.useState<string>("");
  const [score, setScore] = React.useState<number>(0);

  const { mutate: addReview } = useAddReview(comment, Number(id), score, () => {
    alert("리뷰가 등록되었습니다.");
  });

  const handleSubmit = () => {
    // @ts-ignore
    event.preventDefault();
    if (comment.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    addReview();
  };

  if (!movie || isLoading || !id) {
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
          <br />

          <text className="text-2xl font-bold text-main-1">리뷰</text>

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold">내용</label>
              <input
                placeholder="리뷰 작성"
                className="h-20 w-full rounded-md border-2 border-gray-300 px-4 py-2 font-semibold text-main-1 outline-2 outline-gray-600"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold">평점</label>
              <input
                type="number"
                placeholder="평점"
                className="w-full rounded-md border-2 border-gray-300 px-4 py-2 font-semibold text-main-1 outline-2 outline-gray-600"
                value={score}
                onChange={(event) => setScore(Number(event.target.value))}
                max={5}
                min={0}
              />
            </div>

            <Button
              className="w-full bg-gray-600 font-semibold text-white"
              type="submit"
            >
              등록하기
            </Button>
          </form>
        </div>
        <Button
          className="sticky z-50 w-full bg-red-500 font-semibold text-white"
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
