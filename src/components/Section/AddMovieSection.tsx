import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MovieType } from "../../constants/enum";

function AddMovieSection() {
  const items = [
    { key: 1, label: "스릴러", value: MovieType.THRILLER },
    { key: 2, label: "액션", value: MovieType.ACTION },
    { key: 3, label: "코믹", value: MovieType.COMEDY },
    { key: 4, label: "로맨스", value: MovieType.ROMANCE },
  ];

  const [genre, setGenre] = useState<MovieType>();

  return (
    <>
      <div className="flex flex-col items-center space-y-4 self-center">
        <text className="text-3xl font-bold text-main-1">영화 추가하기</text>
        <form>
          <Dropdown>
            <DropdownTrigger>
              <Button className="font-medium">
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
        </form>
      </div>
    </>
  );
}

export default AddMovieSection;
