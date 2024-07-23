"use client";

import FreeLectureFilter from "./components/FreeLectureFilter";
import FreeLectureList from "./components/FreeLectureList";

const FreeLecturePage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center p-7 laptop:w-fit laptop:px-28 laptop:py-14">
        <FreeLectureFilter />
        <FreeLectureList />
      </div>
    </div>
  );
};

export default FreeLecturePage;
