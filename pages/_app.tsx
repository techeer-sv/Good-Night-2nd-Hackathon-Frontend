import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import React, { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type Page<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type Props = AppProps<{ dehydratedState: unknown }> & {
  Component: Page<{ dehydratedState: unknown }>;
};

function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="flex min-h-screen flex-1 flex-col bg-white font-montserrat text-main-1 tablet:px-10">
          <Head>
            <title>테커 굿나잇 2nd 해커톤</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
