"use client";

import EventFilter from "./components/EventFilter";
import EventList from "./components/EventList";

const EventPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center p-7 laptop:px-24 laptop:py-10">
      <EventFilter />
      <EventList />
    </div>
  );
};

export default EventPage;
