"use client";

import ChipToggle from "@components/ui/ChipToggle";
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";

type EventFilterProps = {
  temp?: string;
};

const DUMMY = ["국비교육", "부트캠프", "경진대회", "전시회"];

const EventFilter = ({}: EventFilterProps) => {
  return (
    <div className="w-full space-y-3 rounded-xl bg-brand-secondary p-5 shadow-inner laptop:p-9">
      <div className="text-base font-semibold laptop:text-xl">공고분야</div>
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

export default EventFilter;
