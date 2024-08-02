import FreeLectureTagAddButton from "./components/FreeLectureTagAddButton";
import FreeLectureTagsTable from "./components/FreeLectureTagsTable";

const AdminEventCategoriesPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">무료강의 태그 관리</p>
      <div className="flex max-w-[1300px] flex-col space-y-5">
        <FreeLectureTagsTable />
        <FreeLectureTagAddButton className="self-end" />
      </div>
    </div>
  );
};

export default AdminEventCategoriesPage;
