import React from "react";

import GNB from "../components/GNB";

export default function Layout({
  children,
  isWhiteBg = false,
}: {
  children: React.ReactNode;
  hasMargin?: boolean;
  isWhiteBg?: boolean;
}): JSX.Element {
  return (
    <>
      <header className="justify-center bg-white tablet:flex">
        <GNB />
      </header>
      <div
        className={`flex flex-1 flex-col ${
          isWhiteBg ? "bg-white" : "bg-white"
        } `}
      >
        <main className="relative flex flex-1 flex-col">{children}</main>
      </div>
    </>
  );
}
