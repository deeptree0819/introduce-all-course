import { Fragment } from "react";

import EventCard from "../../components/EventCard";
import Image1 from "../../dummy/event1.png";
import Image2 from "../../dummy/event2.png";
import Image3 from "../../dummy/event3.png";
import Image4 from "../../dummy/event4.png";

const DUMMY = [
  {
    id: 0,
    image: Image1,
    title:
      "뉴모노 울트라 마이크로 스코픽 실리코 볼케이노 코니오시스 클라우드 엔지니어 양성 과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 1,
    image: Image2,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 2,
    image: Image3,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
  {
    id: 3,
    image: Image4,
    title: "클라우드 데이터 엔지니어 양성과정",
    organization: "삼성생명",
    dday: "D-3",
  },
];

type RelatedEventProps = {
  dummy?: string;
};

const RelatedEvent = ({}: RelatedEventProps) => {
  return (
    <section className="space-y-4">
      <h3 className="text-base font-semibold">비슷한 공고를 찾아보세요 ☎️</h3>
      <div className="grid w-fit grid-cols-2 gap-5 laptop:grid-cols-3 laptop:gap-7 desktop:grid-cols-4 desktop:gap-10">
        {DUMMY.map((item) => (
          <Fragment key={item.id}>
            <EventCard item={item} key={item.id} />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default RelatedEvent;
