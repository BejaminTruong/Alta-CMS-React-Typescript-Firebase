import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
type Props = {};

const Layout: FC = (props: Props) => {
  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
