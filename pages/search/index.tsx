import React from "react";
import Layout from "../../src/layouts/Layout";

function Search() {
  return (
    <>
      <main className="mx-10 mt-56 flex flex-col justify-center"></main>
    </>
  );
}

export default Search;

Search.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
