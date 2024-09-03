"use client";

import { Calendar } from "@components/ui/calendar";
import { FormControl } from "@components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { cn } from "@utils/common";
import { DateFnsFormat, getUtcToDateFormat } from "@utils/date";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";

type DatePickerFormProps<T extends FieldValues> = {
  field: ControllerRenderProps<T>;
  defaultValue?: string;
};

export function DatePickerForm<T extends FieldValues>({
  field,
  defaultValue,
}: DatePickerFormProps<T>) {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    defaultValue
  );
  const [initialMount, setInitialMount] = useState(true);

  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }
    setSelectedDate(field.value || undefined);
  }, [field.value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? (
              getUtcToDateFormat(selectedDate, DateFnsFormat.YYYYMMDD)
            ) : (
              <span>날짜를 선택해주세요.</span>
            )}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate ? new Date(selectedDate) : undefined}
          onSelect={(selected) => field.onChange(selected?.toISOString() ?? "")}
          defaultMonth={selectedDate ? new Date(selectedDate) : new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
