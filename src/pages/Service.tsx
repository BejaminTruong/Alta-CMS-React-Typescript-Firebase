import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import React, { FC } from "react";
interface DataType {
  key: string;
  comboCode: string;
  comboName: string;
  applyDate: Date;
  expiryDate: Date;
  ticketPrice: number;
  comboPrice: number;
  status: string;
}

const dataSource: DataType[] = [];

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Mã gói",
    dataIndex: "comboCode",
    key: "comboCode",
  },
  {
    title: "Tên gói vé",
    dataIndex: "comboName",
    key: "comboName",
  },
  {
    title: "Ngày áp dụng",
    dataIndex: "applyDate",
    key: "applyDate",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expiryDate",
    key: "expiryDate",
  },
  {
    title: "Giá vé (VNĐ/Vé)",
    dataIndex: "ticketPrice",
    key: "ticketPrice",
  },
  {
    title: "Giá Combo (VNĐ/Combo)",
    dataIndex: "comboPrice",
    key: "comboPrice",
  },
];

const Service: FC = () => {
  return (
    <div className="mainContainer">
      <h1 className="text-4xl font-bold">Danh sách gói vé</h1>
      <div className="flex justify-between my-10">
        <Input
          placeholder="Tìm bằng số vé"
          suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
          bordered={false}
          className="bg-lightGray max-w-md rounded-lg p-3"
        />
        <div className="flex align-baseline gap-3">
          <button className="btnTicket">Xuất file (.csv)</button>
          <button className="btnTicket bg-normalOrange text-white">Thêm gói vé</button>
        </div>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  );
};

export default Service;
