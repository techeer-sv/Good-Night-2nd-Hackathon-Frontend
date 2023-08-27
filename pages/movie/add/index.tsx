import React from "react";
import AddMovieSection from "../../../src/components/Section/AddMovieSection";
import Layout from "../../../src/layouts/Layout";

function AddMoviePage() {
  return (
    <>
      <main className="mx-10 mt-10 flex flex-col justify-center space-y-10">
        <div className="flex flex-col items-center space-y-2 self-center">
          <text className="self-center text-3xl font-bold text-main-1">
            영화 추가하기
          </text>

          <text className="text-md self-center font-semibold text-main-1">
            영화를 추가해주세요!
          </text>
        </div>

        <AddMovieSection />
      </main>
    </>
  );
}

export default AddMoviePage;

AddMoviePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
