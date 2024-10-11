import DeleteAccountButton from "./components/DeleteAccountButton";
import ProfileCard from "./components/ProfileCard";
import ProfileInfoForm from "./components/ProfileInfoForm";

const MePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1300px] flex-row space-x-14 p-7 laptop:px-24 laptop:py-10">
      <ProfileCard />
      <div className="w-full space-y-6">
        <ProfileInfoForm />
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default MePage;
