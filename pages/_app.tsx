import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { ReactElement, ReactNode } from "react";

type Page<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Props = AppProps<{ dehydratedState: unknown }> & {
  Component: Page<{ dehydratedState: unknown }>;
};

function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col bg-white font-montserrat text-main-1 tablet:px-10">
        <Head>
          <title>테커 굿나잇 2nd 해커톤</title>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </>
  );
}

export default App;
