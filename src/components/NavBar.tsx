import { BellOutlined, MailOutlined, SearchOutlined } from "@ant-design/icons";
import { Image, Input } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NavBar: FC = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className="w-1/6 -mr-10 cursor-pointer">
        <Image
          onClick={() => navigate("/")}
          preview={false}
          width={100}
          src={require("../assets/logoInsight.png")}
        />
      </div>
      <div className="flex flex-1 justify-between">
        <Input
          placeholder="Search"
          suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
          bordered={false}
          className="bg-normalGray max-w-md rounded-lg p-4"
        />
        <div className="flex w-[200px] justify-end items-center gap-4 text-xl text-extraDarkBrown">
          <MailOutlined />
          <BellOutlined />
          <Image
            preview={false}
            width={48}
            height={48}
            src={require("../assets/avatarNav.png")}
            className="rounded-full inline-block"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
