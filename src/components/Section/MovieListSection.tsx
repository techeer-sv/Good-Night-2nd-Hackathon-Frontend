import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFindAllMovies } from "../../api/hook/MovieHook";
import { MovieService } from "../../api/service/MovieService";
import SearchNotFoundSection from "./SearchNotFoundSection";
import LoadingSection from "./LoadingSection";
import useIsAdminStore from "../../storage/zustand/IsAdminStore";
import { MovieType } from "../../constants/enum";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

function MovieListSection() {
  const router = useRouter();

  const items = [
    { key: 1, label: "스릴러", value: MovieType.THRILLER },
    { key: 2, label: "액션", value: MovieType.ACTION },
    { key: 3, label: "코믹", value: MovieType.COMEDY },
    { key: 4, label: "로맨스", value: MovieType.ROMANCE },
  ];

  const { isAdmin } = useIsAdminStore();

  const [isShowing, setIsShowing] = useState<boolean>();
  const [genre, setGenre] = useState<string>();

  const {
    data: movies,
    refetch: refetchMovie,
    isLoading,
  } = useFindAllMovies({
    genre: genre,
    isShowing: isShowing,
  });

  if (!movies || isLoading) {
    return <LoadingSection />;
  } else if (movies.data === null) {
    return <SearchNotFoundSection onClick={() => setGenre(undefined)} />;
  }

  const deleteMovie = async (id: number) => {
    await MovieService.deleteMovie(id).then(() => {
      refetchMovie();
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-2">
          <text className="text-4xl font-bold">영화 목록</text>
          <div className="flex w-full justify-between">
            <Dropdown className="w-full">
              <DropdownTrigger>
                <Button className="font-semibold">
                  {genre ?? "영화 장르 선택하기"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dynamic Actions"
                items={items}
                disabledKeys={[genre ?? "reset"]}
              >
                {items
                  .map((item) => (
                    <DropdownItem
                      id={item.key.toString()}
                      key={item.key}
                      value={item.value}
                      className="text-black"
                      onClick={() => {
                        setGenre(item.value);
                      }}
                    >
                      {item.label}
                    </DropdownItem>
                  ))
                  .concat(
                    <DropdownItem
                      key="reset"
                      className="text-danger"
                      color="danger"
                      onClick={() => setGenre(undefined)}
                    >
                      초기화
                    </DropdownItem>
                  )}
              </DropdownMenu>
            </Dropdown>
            <div className="flex items-center justify-center space-x-2">
              <label className="text-lg font-semibold">상영 여부</label>
              <input
                type="checkbox"
                checked={isShowing}
                onChange={() => setIsShowing(!isShowing)}
              />
            </div>
          </div>
        </div>
        {movies?.data?.map((movie: any, index: number) => (
          <div className="flex place-content-between">
            <div
              className="cursor-pointer font-semibold"
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <text>{index + 1}. </text>
              <text>{movie.title}</text>
            </div>
            {isAdmin && (
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
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieListSection;
