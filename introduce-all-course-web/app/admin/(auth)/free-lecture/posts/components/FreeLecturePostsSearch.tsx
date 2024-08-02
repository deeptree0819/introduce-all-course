import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FreeLecturePostsSearchProps = {
  dummy?: string;
};

const FreeLecturePostsSearch = ({}: FreeLecturePostsSearchProps) => {
  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Input placeholder="무료강의 제목" className="w-80" />
      <Button>검색</Button>
    </div>
  );
};

export default FreeLecturePostsSearch;
