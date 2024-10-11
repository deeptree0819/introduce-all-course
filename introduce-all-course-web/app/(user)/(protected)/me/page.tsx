import DeleteAccountButton from "./components/DeleteAccountButton";
import ProfileCard from "./components/ProfileCard";
import ProfileInfoForm from "./components/ProfileInfoForm";

const MePage = () => {
  return (
    <div className="flex w-full flex-col space-y-5 p-5 tablet:mx-auto tablet:max-w-[500px] tablet:p-7 laptop:max-w-[1300px] laptop:flex-row laptop:space-x-14 laptop:space-y-0 laptop:p-7 laptop:px-24 laptop:py-10">
      <ProfileCard />
      <div className="w-full space-y-6">
        <ProfileInfoForm />
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default MePage;
