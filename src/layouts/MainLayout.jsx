import { Outlet } from "react-router";
import StickyNavbar from "../components/StickyNavbar";
import TaskFooter from "../components/TaskFooter";

const MainLayout = () => {
  return (
    <div>
      <header className="mx-auto w-11/12">
        <StickyNavbar></StickyNavbar>
      </header>
      <main className="mx-auto w-11/12">
        <Outlet></Outlet>
      </main>
      <footer className="mx-auto w-11/12 pt-12">
        <TaskFooter></TaskFooter>
      </footer>
    </div>
  );
};

export default MainLayout;
