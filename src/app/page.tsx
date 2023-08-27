"use client";

import { useEffect, useState } from "react";

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
};

export default function Home() {
  const [genre, setGenre] = useState<string>("");
  const [isShowing, setIsShowing] = useState<string>("");
  const [data, setData] = useState<Movie[]>([]);

  async function getMovies() {
    const url = new URL("http://localhost:8000/movies");
    const params = new URLSearchParams();

    if (genre) {
      params.set("genre", genre);
    }

    if (isShowing) {
      params.set("isShowing", isShowing);
    }

    url.search = params.toString();

    try {
      const dataRes = await fetch(url.toString());
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

  const handleGenreSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handleIsShowingSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsShowing(e.target.value);
  };

  useEffect(() => {
    getMovies();
  }, [genre, isShowing]);

  return (
    <div>
      <div className="">
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
      </div>
      {data.map((movie) => (
        <div className="flex ml-2 gap-2" key={movie.id}>
          <div>제목 : {movie.title}</div>
          <div>장르 : {movie.genre}</div>
          <div>개봉일 : {movie.releaseDate}</div>
          <div>상영종료일 : {movie.endDate}</div>
          <div>상영여부 : {movie.isShowing ? "상영중" : "상영중지"}</div>
        </div>
      ))}
    </div>
  );
}
