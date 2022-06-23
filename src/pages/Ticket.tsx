import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import { FiFilter } from "react-icons/fi";
import React, { FC } from "react";

interface DataType {
  key: string,
  stt: number,
  bookingCode: string,
  ticketNumber: number,
  status: string,
  usageDate: Date,
  issueDate: Date,
  checkInGate: string
};

const dataSource: DataType[] = [];

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Booking code",
    dataIndex: "bookingCode",
    key: "bookingCode",
  },
  {
    title: "Số vé",
    dataIndex: "ticketNumber",
    key: "ticketNumber",
  },
  {
    title: "Tình trạng sử dụng",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "usageDate",
    key: "usageDate",
  },
  {
    title: "Ngày xuất vé",
    dataIndex: "issueDate",
    key: "issueDate",
  },
  {
    title: "Cổng check-in",
    dataIndex: "checkInGate",
    key: "checkInGate",
  },
];
const Ticket: FC = () => {
  return (
    <div className="mainContainer">
      <h1 className="text-4xl font-bold">Danh sách vé</h1>
      <div className="flex justify-between my-10">
        <Input
          placeholder="Tìm bằng số vé"
          suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
          bordered={false}
          className="bg-lightGray max-w-md rounded-lg p-3"
        />
        <div className="flex align-baseline gap-3">
          <button className="btnTicket">
            <FiFilter />
            Lọc vé
          </button>
          <button className="btnTicket">Xuất file (.csv)</button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={{position: ["bottomCenter"]}}/>
    </div>
  );
};

export default Ticket;
