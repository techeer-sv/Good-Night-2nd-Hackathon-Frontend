import React from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

interface Props {
  onClick: () => void;
}

function SearchNotFoundSection({ onClick }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="mt-40 flex flex-col items-center space-y-10 self-center">
        <text
          key="introduction-name"
          className="text-5xl font-bold text-main-1"
        >
          찾으시는 영화가 없나요?
        </text>
        <nav
          key="introduction-short"
          className="cursor-pointer text-left text-indigo-400"
          onClick={() => router.push("/movie/add")}
        >
          내가 찾는 영화가 없다면 등록해주세요!
        </nav>
        <Button onClick={onClick}>필터 초기화하기</Button>
      </div>
    </>
  );
}

export default SearchNotFoundSection;
