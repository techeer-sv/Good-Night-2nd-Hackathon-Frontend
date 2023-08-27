import { useRouter } from "next/router";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

function GNB() {
  const router = useRouter();

  const items = [
    {
      key: "seeMovieList",
      label: "영화 목록 보기",
      value: "/",
    },
    {
      key: "addMovie",
      label: "영화 추가",
      value: "/movie/add",
    },
  ];

  return (
    <div className="mx-10 flex h-24 max-w-full place-items-center tablet:w-full tablet:max-w-screen-xl">
      <nav
        className="flex w-full space-x-2 self-center"
        onClick={() => {
          router.replace("/");
        }}
      >
        <img
          className="h-12 w-fit cursor-pointer rounded-full"
          src={"/png/logo.png"}
          alt={"logoImg"}
        />
        <button
          className={"hidden tablet:block tablet:text-xl tablet:font-semibold"}
        >
          GoodNight 2nd Hackathon
        </button>
      </nav>
      <div className="flex h-full place-items-center justify-end tablet:hidden">
        <Dropdown className="w-full">
          <DropdownTrigger>
            <Button className="font-semibold">이동하기</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={items}>
            {items.map((item) => (
              <DropdownItem
                id={item.key.toString()}
                key={item.key}
                value={item.value}
                className="text-black"
                onClick={() => router.push(item.value)}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default GNB;
