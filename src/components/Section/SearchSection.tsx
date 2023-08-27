import React from "react";
import { useRouter } from "next/router";

function SearchSection() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center space-y-10 self-center">
        <text
          key="introduction-name"
          className="text-7xl font-bold text-main-1"
        >
          찾으시는 영화가 있을까요?
        </text>
        <nav
          key="introduction-short"
          className="cursor-pointer text-left text-indigo-400"
          onClick={() => router.push("/movie/add")}
        >
          내가 찾는 영화가 없다면 등록해주세요!
        </nav>
      </div>
    </>
  );
}

export default SearchSection;
