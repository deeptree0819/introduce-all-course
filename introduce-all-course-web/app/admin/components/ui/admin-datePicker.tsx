"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@utils/common";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { AdminButton } from "./admin-button";
import { AdminCalendar } from "./admin-calendar";

function AdminDatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <AdminButton
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? (
            format(date, "yyyy-MM-dd")
          ) : (
            <span>날짜를 선택해주세요.</span>
          )}
        </AdminButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <AdminCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default AdminDatePicker;
