import React from "react";
import Layout from "../../../src/layouts/Layout";
import EditMovieSection from "../../../src/components/Section/EditMovieSection";

function EditMoviePage() {
  return (
    <>
      <main className="mx-10 mt-10 flex flex-col justify-center space-y-10">
        <div className="flex flex-col items-center space-y-2 self-center">
          <text className="self-center text-3xl font-bold text-main-1">
            영화 수정하기
          </text>
        </div>

        <EditMovieSection />
      </main>
    </>
  );
}

export default EditMoviePage;

EditMoviePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
