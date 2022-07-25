import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { FC, useEffect } from "react";
import { HiOutlineTicket } from "react-icons/hi";
import { TbFileInvoice } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Sidebar: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname !== "/") {
      document.getElementById("/")?.classList.remove("sidebarActive");
      if (window.location.pathname === "/service") {
        document.getElementById("setting")?.classList.add("sidebarActive");
        document
          .getElementById("service")
          ?.classList.add("font-bold", "text-darkBrown");
      } else
        document
          .getElementById(window.location.pathname.replace("/", ""))
          ?.classList.add("sidebarActive");
    }
  }, []);

  const handleActive = () => {
    const arr = document.getElementsByClassName("sidebarBtn");
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      el.classList.remove("sidebarActive");
    }
    document
      .getElementById("service")
      ?.classList.remove("font-bold", "text-darkBrown");
  };
  return (
    <div className="sidebarContainer">
      <button
        id="/"
        onClick={() => {
          navigate("/");
          handleActive();
          document.getElementById("/")?.classList.add("sidebarActive");
        }}
        className="sidebarBtn sidebarActive"
      >
        <HomeOutlined className="sidebarIcon" />
        Trang chủ
      </button>
      <button
        id="ticket"
        onClick={() => {
          navigate("/ticket");
          handleActive();
          document.getElementById("ticket")?.classList.add("sidebarActive");
        }}
        className="sidebarBtn"
      >
        <HiOutlineTicket className="sidebarIcon " />
        Quản lý vé
      </button>
      <button
        id="invoice"
        onClick={() => {
          navigate("/invoice");
          handleActive();
          document.getElementById("invoice")?.classList.add("sidebarActive");
        }}
        className="sidebarBtn"
      >
        <TbFileInvoice className="sidebarIcon " />
        Đối soát vé
      </button>
      <button id="setting" className="sidebarBtn">
        <SettingOutlined className="sidebarIcon " />
        Cài đặt
      </button>
      <button
        id="service"
        onClick={() => {
          handleActive();
          navigate("/service");
          document.getElementById("setting")?.classList.add("sidebarActive");
          document
            .getElementById("service")
            ?.classList.add("font-bold", "text-darkBrown");
        }}
        className="sidebarBtn justify-center p-0"
      >
        Gói dịch vụ
      </button>
    </div>
  );
};

export default Sidebar;
