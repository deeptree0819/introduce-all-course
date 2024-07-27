import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EventSearchProps = {
  dummy?: string;
};

const EventSearch = ({}: EventSearchProps) => {
  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Input placeholder="공고명, 주최기관" className="w-80" />
      <Button>검색</Button>
    </div>
  );
};

export default EventSearch;
