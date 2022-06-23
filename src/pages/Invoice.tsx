import { SearchOutlined } from "@ant-design/icons";
import { Input, Radio, RadioChangeEvent, Space, Table } from "antd";
import React, { FC, useState } from "react";
import CustomDatePicker from "../components/CustomDatePicker";

interface DataType {
  key: string;
  stt: string;
  ticketNumber: number;
  usageDate: Date;
  ticketType: string;
  checkInGate: string;
}

const dataSource: DataType[] = [];

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Số vé",
    dataIndex: "ticketNumber",
    key: "ticketNumber",
  },
  {
    title: "Ngày sử dụng",
    dataIndex: "usageDate",
    key: "usageDate",
  },
  {
    title: "Tên loại vé",
    dataIndex: "ticketType",
    key: "ticketType",
  },
  {
    title: "Cổng check-in",
    dataIndex: "checkInGate",
    key: "checkInGate",
  },
];

const Invoice: FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="invoiceContainer">
      <div className="mainContainer w-3/4">
        <h1 className="text-4xl font-bold">Đối soát vé</h1>
        <div className="flex justify-between my-10">
          <Input
            placeholder="Tìm bằng số vé"
            suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
            bordered={false}
            className="bg-lightGray max-w-md rounded-lg p-3"
          />
          <div className="flex align-baseline gap-3">
            <button className="btnTicket bg-normalOrange text-white">
              Chốt đối soát
            </button>
          </div>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
      <div className="sideContainer">
        <h1 className="text-xl font-bold">Lọc vé</h1>
        <div className="sideItems">
          <p>Tình trạng đối soát</p>
          <div className="w-1/2 justify-start">
            <Radio.Group size="large" onChange={onChange} value={value} className="font-medium text-darkBrown">
              <Space direction="vertical">
                <Radio value={1}>Tất cả</Radio>
                <Radio value={2}>Đã đối soát</Radio>
                <Radio value={3}>Chưa đối soát</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="sideItems">
          <p>Loại vé</p>
          <p className="w-1/2 justify-start font-medium">Vé cổng</p>
        </div>
        <div className="sideItems">
          <p>Từ ngày</p>
          <div className="w-1/2 justify-start">
            <CustomDatePicker format="DD/MM/YYYY" />
          </div>
        </div>
        <div className="sideItems">
          <p>Đến ngày</p>
          <div className="w-1/2 justify-start">
            <CustomDatePicker format="DD/MM/YYYY" />
          </div>
        </div>
        <button className="btnTicket px-16 mx-auto">Lọc</button>
      </div>
    </div>
  );
};

export default Invoice;
