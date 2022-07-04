import {
  CaretLeftOutlined,
  CaretRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Input,
  PaginationProps,
  Radio,
  RadioChangeEvent,
  Space,
  Table,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CustomDatePicker from "../components/CustomDatePicker";
import {
  fetchData,
  InvoiceListType,
  selectInvoice,
} from "../features/invoice/invoiceSlice";

const columns: ColumnsType<InvoiceListType> = [
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
    title: "Tên sự kiện",
    dataIndex: "eventName",
    key: "eventName",
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
  {
    title: "",
    dataIndex: "control",
    key: "control",
    render: (text) => (
      <>
        {text.toLowerCase() === "đã đối soát" ? (
          <p className="italic text-normalRed">{text}</p>
        ) : (
          <p className="italic text-extraDarkGray">{text}</p>
        )}
      </>
    ),
  },
];

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return <CaretLeftOutlined className="text-normalOrange" />;
  }
  if (type === "next") {
    return <CaretRightOutlined className="text-normalOrange" />;
  }
  return originalElement;
};

const Invoice: FC = () => {
  const invoiceData = useAppSelector(selectInvoice);
  const [filteredData, setFilteredData] = useState<InvoiceListType[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [checkedStatus, setCheckedStatus] = useState<string>("");
  const fetcher = async () => {
    setLoading(true);
    const fetchedInvoices = await dispatch(fetchData());
    if (fetchedInvoices) {
      setFilteredData(fetchedInvoices.payload as InvoiceListType[]);
      setLoading(false);
    }
  };
  const { error } = useSWR("invoice/get", fetcher);
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(invoiceData);
    }
    setFilteredData((prev) =>
      prev.filter((e) => e.ticketNumber.toString().includes(searchTerm))
    );
  }, [searchTerm]);

  useEffect(() => {
    let finalFilteredData;
    if (checkedStatus === "") fetcher();
    finalFilteredData = invoiceData.filter(
      (e) => e.control.toLowerCase() === checkedStatus.toLowerCase()
    );
    setFilteredData(finalFilteredData as InvoiceListType[]);
  }, [checkedStatus]);

  return (
    <div className="invoiceContainer">
      <div className="mainContainer w-3/4">
        <h1 className="text-4xl font-bold">Đối soát vé</h1>
        <div className="flex justify-between my-10">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm bằng số vé"
            suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
            bordered={false}
            className="bg-lightGray max-w-md rounded-lg p-3"
          />
          <div className="flex align-baseline gap-3">
            <button className="btnTicket">Chốt đối soát</button>
          </div>
        </div>
        <Table
          loading={loading}
          dataSource={error ? undefined : filteredData}
          columns={columns}
          pagination={{ position: ["bottomCenter"], itemRender }}
        />
      </div>
      <div className="sideContainer">
        <h1 className="text-xl font-bold">Lọc vé</h1>
        <div className="sideItems">
          <p>Tình trạng đối soát</p>
          <div className="w-1/2 justify-start">
            <Radio.Group
              size="large"
              defaultValue={checkedStatus}
              className="font-medium text-darkBrown"
              onChange={(e) => {
                setCheckedStatus(e.target.value);
              }}
            >
              <Space direction="vertical">
                <Radio value="">Tất cả</Radio>
                <Radio value="Đã đối soát">Đã đối soát</Radio>
                <Radio value="Chưa đối soát">Chưa đối soát</Radio>
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
