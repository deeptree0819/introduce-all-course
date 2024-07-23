"use client";

import EventFilter from "./components/EventFilter";
import EventList from "./components/EventList";

const EventPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center p-7 laptop:w-fit laptop:px-28 laptop:py-14">
        <EventFilter />
        <EventList />
      </div>
    </div>
  );
};

export default EventPage;
