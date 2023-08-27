"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Data = {
  movies: Movie[];
  total: number;
};

type Movie = {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  endDate: string;
  isShowing: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  averageRating: number;
};

export default function Home() {
  const [genre, setGenre] = useState<string>("");
  const [isShowing, setIsShowing] = useState<string>("");
  const [data, setData] = useState<Data>({ movies: [], total: 0 });
  const [minRating, setMinRating] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  async function getMovies() {
    const genreIsShowingurl = new URL("http://localhost:8000/movies");
    const params = new URLSearchParams();

    if (genre) {
      params.set("genre", genre);
    }

    if (isShowing) {
      params.set("isShowing", isShowing);
    }

    params.set("page", page.toString());
    params.set("itemsPerPage", "8");

    genreIsShowingurl.search = params.toString();

    try {
      const dataRes = await fetch(genreIsShowingurl.toString());
      if (!dataRes.ok) {
        throw new Error(`HTTP error! Status: ${dataRes.status}`);
      }
      const resJson = await dataRes.json();
      console.log(resJson);
      setData(resJson);
    } catch (error) {
      console.error(error);
      alert("영화 조회에 실패했습니다.");
    }
  }

  async function deleteMovie(id: number) {
    const url = `http://localhost:8000/movies/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
      getMovies();
    } catch (error) {
      console.error(error);
      alert("영화 삭제에 실패했습니다.");
    }
  }

  const handleGenreSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handleIsShowingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsShowing(e.target.value);
  };

  const handleMinRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinRating(Number(e.target.value));
  };

  useEffect(() => {
    getMovies();
  }, [genre, isShowing, page]);

  return (
    <div>
      <div>
        <select value={genre} onChange={handleGenreSelect}>
          <option value="">전체</option>
          <option value="스릴러">스릴러</option>
          <option value="로맨스">로맨스</option>
          <option value="코믹">코믹</option>
          <option value="액션">액션</option>
        </select>
        <select value={isShowing} onChange={handleIsShowingSelect}>
          <option value="">전체</option>
          <option value="true">상영중</option>
          <option value="false">비상영</option>
        </select>
        <input
          className="w-[200px] mt-2"
          type="range"
          id="range"
          name="rating"
          min="0"
          max="5"
          step="1"
          value={minRating}
          onChange={handleMinRatingChange}
        />
        <span>{minRating}</span>
        <Link href="/submit">추가하기</Link>
      </div>
      {data.movies.map((movie) =>
        movie.averageRating >= minRating ? (
          <div className="flex ml-2 gap-2" key={movie.id}>
            <Link className="flex ml-2 gap-2" href={`/detail/${movie.id}`}>
              <div>제목 : {movie.title}</div>
              <div>장르 : {movie.genre}</div>
              <div>개봉일 : {movie.releaseDate}</div>
              <div>상영종료일 : {movie.endDate}</div>
              <div>상영여부 : {movie.isShowing ? "상영중" : "상영중지"}</div>
            </Link>
            <Link href={`/modify/${movie.id}`}>수정</Link>
            <button type="button" onClick={() => deleteMovie(movie.id)}>
              삭제
            </button>
          </div>
        ) : null
      )}
      <div className="flex gap-4 ml-80">
        <button type="button" onClick={() => setPage(1)}>
          1
        </button>
        <button type="button" onClick={() => setPage(2)}>
          2
        </button>
        <button type="button" onClick={() => setPage(3)}>
          3
        </button>
        <button type="button" onClick={() => setPage(4)}>
          4
        </button>
      </div>
    </div>
  );
}
