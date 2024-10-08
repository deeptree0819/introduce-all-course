"use client";

import FreeLectureFilter from "./components/FreeLectureFilter";
import FreeLectureList from "./components/FreeLectureList";

const FreeLecturePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center p-7 laptop:px-24 laptop:py-10">
      <FreeLectureFilter />
      <FreeLectureList />
    </div>
  );
};

export default FreeLecturePage;
