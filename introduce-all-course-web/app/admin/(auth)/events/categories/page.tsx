import EventCategoriesTable from "./components/EventCategoriesTable";
import EventCategoryAddButton from "./components/EventCategoryAddButton";

const AdminEventCategoriesPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">공고 분야 관리</p>
      <div className="flex max-w-[1300px] flex-col space-y-5">
        <EventCategoriesTable />
        <EventCategoryAddButton className="self-end" />
      </div>
    </div>
  );
};

export default AdminEventCategoriesPage;
