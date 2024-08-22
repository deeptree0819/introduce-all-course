"use client";

import { FreeLectureTags } from "@generated/index";
import { PlusSquareIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useGetAllFreeLectureTagsWithPagination } from "@/app/hooks/admin/adminFreeLectureHooks";
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
  onChange?: (tagIds: number[]) => void;
  defaultValue?: FreeLectureTags[];
};

const FreeLectureTagSelector = ({
  className,
  onChange,
  defaultValue,
}: FreeLectureTagSelectorProps) => {
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>(
    defaultValue?.map((tag) => tag.free_lecture_tag_name) ?? []
  );
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    defaultValue?.map((tag) => tag.free_lecture_tags_id) ?? []
  );

  const { data: eventCategories } = useGetAllFreeLectureTagsWithPagination({
    page: 1,
    itemsPerPage: 100,
  });

  useEffect(() => {
    onChange?.(selectedTagIds);
  }, [selectedTagIds]);

  if (!eventCategories) return null;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="title">태그*</Label>
      <Popover>
        <PopoverTrigger asChild>
          {selectedTagNames.length === 0 ? (
            <div className="flex max-w-xs flex-row items-center justify-center space-x-2 rounded-md border border-slate-200 p-2 text-sm text-muted-foreground">
              <PlusSquareIcon size={20} />
              <span>태그를 추가해주세요.</span>
            </div>
          ) : (
            <div className="flex max-w-xs flex-row flex-wrap gap-2 rounded-md border border-slate-200 p-2">
              {selectedTagNames.map((tag, index) => (
                <Badge
                  key={index}
                  className="rounded-sm bg-[#D0E8FF] text-xs font-medium text-[#0029FF] hover:bg-[#D0E8FF]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTagNames((prevTags) =>
                      prevTags.filter((t) => t !== tag)
                    );
                    setSelectedTagIds((prevIds) =>
                      prevIds.filter((id) => id !== selectedTagIds[index])
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
                {eventCategories.items
                  .filter(
                    (tag) =>
                      !selectedTagNames.includes(tag.free_lecture_tag_name)
                  )
                  .map((tag, index) => (
                    <CommandItem
                      key={index}
                      value={tag.free_lecture_tag_name}
                      onSelect={(currentValue) => {
                        setSelectedTagNames((prevTags) => [
                          ...prevTags,
                          currentValue,
                        ]);
                        setSelectedTagIds((prevIds) => [
                          ...prevIds,
                          tag.free_lecture_tags_id,
                        ]);
                      }}
                    >
                      {tag.free_lecture_tag_name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FreeLectureTagSelector;
