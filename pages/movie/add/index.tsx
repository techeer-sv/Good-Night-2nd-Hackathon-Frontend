import React from "react";
import AddMovieSection from "../../../src/components/Section/AddMovieSection";
import Layout from "../../../src/layouts/Layout";

function AddMoviePage() {
  return (
    <>
      <main className="mx-10 mt-56 flex flex-col justify-center tablet:mt-72">
        <AddMovieSection />
      </main>
    </>
  );
}

export default AddMoviePage;

AddMoviePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
