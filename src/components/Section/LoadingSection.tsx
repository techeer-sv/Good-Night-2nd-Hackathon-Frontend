import { Controls, Player } from "@lottiefiles/react-lottie-player";
import React from "react";

function LoadingSection() {
  return (
    <section className="px-4 py-8 text-center">
      <div className="max-w-auto mx-auto md:max-w-4xl">
        <div className="my-12 flex flex-col items-center md:my-20">
          {/** asset 주소: https://lottiefiles.com/search?q=404&category=animations&animations-sort=popular */}
          <Player
            autoplay
            loop
            src="https://lottie.host/d7fc74ef-25b8-487c-8b35-8d3daf5d161a/gmDVOgNjZI.json"
            className="max-w-[500px]"
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
          <div className="text-3xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            Loading...
          </div>
          <div className="mt-8 text-sm font-medium text-main-1 md:text-xl lg:text-2xl">
            잠시만 기다려주세요...
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoadingSection;
