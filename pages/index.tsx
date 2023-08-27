import React from "react";
import Layout from "../src/layouts/Layout";
import MovieListSection from "../src/components/Section/MovieListSection";

function Home() {
  return (
    <>
      <main className="mx-10 mt-10 flex flex-col justify-center">
        <MovieListSection />
      </main>
    </>
  );
}

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
