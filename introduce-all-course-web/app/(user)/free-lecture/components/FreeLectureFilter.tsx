"use client";

import ChipToggle from "@components/ui/ChipToggle";
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";

type FreeLectureFilterProps = {
  temp?: string;
};

const DUMMY = ["클라우드", "디자인", "로봇HW", "로봇SW"];

const FreeLectureFilter = ({}: FreeLectureFilterProps) => {
  return (
    <div className="w-full space-y-3 rounded-xl bg-brand-secondary p-5 shadow-inner laptop:p-9">
      <div className="text-xl font-semibold laptop:text-xl">강의분야</div>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {DUMMY.map((value, index) => (
          <Fragment key={index}>
            <ChipToggle label={value} onClick={() => {}} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default FreeLectureFilter;
