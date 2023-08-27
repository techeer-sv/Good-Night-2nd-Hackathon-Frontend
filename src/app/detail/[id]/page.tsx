type DetailProps = {
  params: { id: number };
  searchParams: {};
};

import Reviews from "./Reviews";

export default async function Detail({ params }: DetailProps) {
  let error = false;
  const movieUrl = `http://localhost:8000/movies/${params.id}`;

  const movieDataRes = await fetch(movieUrl, {
    cache: "no-store",
  });

  if (!movieDataRes.ok) {
    error = true;
  }
  const movie = await movieDataRes.json();

  return (
    <>
      {error ? (
        <div>영화 조회 실패</div>
      ) : (
        <div className="ml-2 gap-2">
          <div>제목 : {movie.title}</div>
          <div>장르 : {movie.genre}</div>
          <div>개봉일 : {movie.releaseDate}</div>
          <div>상영종료일 : {movie.endDate}</div>
          <div>상영여부 : {movie.isShowing ? "상영중" : "상영중지"}</div>
          <Reviews movieId={params.id} />
        </div>
      )}
    </>
  );
}
