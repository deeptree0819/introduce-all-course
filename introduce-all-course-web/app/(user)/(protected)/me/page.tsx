import ProfileCard from "./components/ProfileCard";
import ProfileInfo from "./components/ProfileInfo";

const MePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1300px] flex-row space-x-14 p-7 laptop:px-24 laptop:py-10">
      <ProfileCard />
      <ProfileInfo />
    </div>
  );
};

export default MePage;
