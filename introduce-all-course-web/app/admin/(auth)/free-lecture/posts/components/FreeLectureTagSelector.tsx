"use client";

import { PlusSquareIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FreeLectureTagSelectorProps = {
  className?: string;
};

const DUMMY_DATA = [
  "클라우드",
  "인턴",
  "경진대회",
  "코딩테스트",
  "프로젝트",
  "대학생",
  "취업",
  "자소서",
];

const FreeLectureTagSelector = ({}: FreeLectureTagSelectorProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="title">태그</Label>
      <Popover>
        <PopoverTrigger asChild>
          {selectedTags.length === 0 ? (
            <div className="flex max-w-xs flex-row items-center justify-center space-x-2 rounded-md border border-slate-200 p-2 text-sm text-muted-foreground">
              <PlusSquareIcon size={20} />
              <span>태그를 추가해주세요.</span>
            </div>
          ) : (
            <div className="flex max-w-xs flex-row flex-wrap gap-2 rounded-md border border-slate-200 p-2">
              {selectedTags.map((tag, index) => (
                <Badge
                  key={index}
                  className="rounded-sm bg-[#D0E8FF] text-xs font-medium text-[#0029FF] hover:bg-[#D0E8FF]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTags((prevTags) =>
                      prevTags.filter((t) => t !== tag)
                    );
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput placeholder="태그를 검색하세요." />
            <CommandList>
              <CommandEmpty>해당하는 태그가 없습니다.</CommandEmpty>
              <CommandGroup>
                {DUMMY_DATA.filter((tag) => !selectedTags.includes(tag)).map(
                  (tag, index) => (
                    <CommandItem
                      key={index}
                      value={tag}
                      onSelect={(currentValue) => {
                        setSelectedTags((prevTags) => {
                          if (prevTags.includes(currentValue)) {
                            return prevTags.filter(
                              (tag) => tag !== currentValue
                            );
                          } else {
                            return [...prevTags, currentValue];
                          }
                        });
                      }}
                    >
                      {tag}
                    </CommandItem>
                  )
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FreeLectureTagSelector;
