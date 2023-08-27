import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
// @ts-ignore
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { MovieType } from "../../constants/enum";
import { useAddMovie } from "../../api/hook/MovieHook";
import { useRouter } from "next/router";

function AddMovieSection() {
  const items = [
    { key: 1, label: "스릴러", value: MovieType.THRILLER },
    { key: 2, label: "액션", value: MovieType.ACTION },
    { key: 3, label: "코믹", value: MovieType.COMEDY },
    { key: 4, label: "로맨스", value: MovieType.ROMANCE },
  ];
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<MovieType>();
  const [releasedAt, setReleasedAt] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { mutate: addMovie } = useAddMovie(
    title,
    genre || MovieType.THRILLER,
    releasedAt,
    endDate,
    () => {
      alert("영화가 성공적으로 등록되었습니다.");
      router.push("/");
    }
  );

  const handleSubmit = async () => {
    // @ts-ignore
    event.preventDefault();
    if (!title || !genre || !releasedAt || !endDate) {
      alert("모든 필수 항목들을 입력해주세요.");
      return;
    }

    addMovie();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <form
          className="flex w-fit flex-col space-y-6 self-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-xl font-bold text-main-1">
              *영화 제목을 작성해주세요
            </label>
            <input
              className="w-full rounded-md border-2 border-gray-300 px-2 py-1 font-semibold text-main-1 outline-2 outline-gray-600"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-bold text-main-1">
              *영화 장르를 선택해주세요
            </label>
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
                      onClick={() => setGenre(item.value)}
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
          </div>
          <div className="flex flex-col">
            <label className="text-xl font-bold text-main-1">
              *영화 개봉일 선택
            </label>
            <DatePicker
              dateFormat="MM-dd-yyyy"
              placeholderText={"개봉일 선택하기"}
              selected={releasedAt}
              onChange={(date: Date) => setReleasedAt(date)}
            />
          </div>
          <div className="flex flex-col">
            <label className="truncate text-xl font-bold text-main-1">
              *영화 상영종료일 선택
            </label>
            <DatePicker
              dateFormat="MM-dd-yyyy"
              placeholderText={"상영종료일 선택하기"}
              selected={endDate}
              onChange={(date: Date) => {
                if (date > releasedAt) setEndDate(date);
                else alert("개봉일보다 빠를 수 없습니다.");
              }}
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
    </>
  );
}

export default AddMovieSection;
