import React from "react";

function SearchSection() {
  return (
    <>
      <div className="flex h-[70vh] flex-col items-center space-y-4 self-center">
        <text
          key="introduction-name"
          className="text-7xl font-bold text-main-1"
        >
          찾으시는 영화가 있을까요?
        </text>
        <text key="introduction-short" className="text-left"></text>
      </div>
    </>
  );
}

export default SearchSection;
