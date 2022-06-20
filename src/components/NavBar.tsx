import { BellOutlined, MailOutlined, SearchOutlined } from "@ant-design/icons";
import { Image, Input } from "antd";
import React, { FC } from "react";

type Props = {};

const NavBar: FC = (props: Props) => {
  return (
    <div className="flex">
      <div className="w-1/6">
        <Image
          preview={false}
          width={100}
          src={require("../assets/logoInsight.png")}
        />
      </div>
      <div className="flex w-5/6 justify-between">
        <Input
          placeholder="Search"
          suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
          bordered={false}
          className="bg-lightGray max-w-md rounded-lg"
        />
        <div className="flex w-[200px] justify-end items-center gap-4 text-xl">
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
