import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import React from "react";

function NotFoundErrorSection() {
  const router = useRouter();

  return (
    <section className="px-4 py-8 text-center">
      <div className="max-w-auto mx-auto md:max-w-4xl">
        <div className="my-12 flex flex-col items-center md:my-20">
          {/** asset 주소: https://lottiefiles.com/search?q=404&category=animations&animations-sort=popular */}
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/packages/lf20_zyu0ctqb.json"
            className="max-w-[500px]"
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
          <div className="text-3xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            존재하지 않는 페이지입니다.
          </div>
          <div className="mt-8 text-sm font-medium text-main-1 md:text-xl lg:text-2xl">
            The page you are looking for does not exist.
          </div>
          <button
            type="button"
            className="mt-8 flex items-center rounded-lg bg-main-1 px-4 py-2 text-white"
            onClick={() => router.replace("/")}
          >
            <span className="font-medium">Back To Homepage</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFoundErrorSection;
