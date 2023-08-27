import React from "react";
import Layout from "../src/layouts/Layout";
import SearchSection from "../src/components/Section/SearchSection";

function Home() {
  return (
    <>
      <main className="mx-10 mt-56 flex flex-col justify-center tablet:mt-72">
        <SearchSection />
      </main>
    </>
  );
}

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
