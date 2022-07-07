import {
  CaretLeftOutlined,
  CaretRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, PaginationProps, Table } from "antd";
import { FiFilter } from "react-icons/fi";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchData,
  selectTicket,
  TicketListType,
} from "../features/ticket/ticketSlice";
import { ColumnsType } from "antd/lib/table";
import CustomTag from "../components/CustomTag";
import TicketModal from "../components/TicketModal";
import { CSVLink } from "react-csv";

const columns: ColumnsType<TicketListType> = [
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
    title: "Tên sự kiện",
    dataIndex: "eventName",
    key: "eventName",
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
    render: (text) => <CustomTag name={text} />,
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

const Ticket: FC = () => {
  const ticketData = useAppSelector(selectTicket);
  const [filteredData, setFilteredData] = useState<TicketListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(ticketData);
    }
    setFilteredData((prev) =>
      prev.filter((e) => e.ticketNumber.toString().includes(searchTerm))
    );
  }, [searchTerm]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const fetcher = async () => {
    setLoading(true);
    const fetchedData = await dispatch(fetchData());
    if (fetchedData) {
      setFilteredData(fetchedData.payload as TicketListType[]);
      setLoading(false);
    }
  };
  const { error } = useSWR("ticket/get", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return (
    <div className="mainContainer">
      <h1 className="text-4xl font-bold">Danh sách vé</h1>
      <div className="flex justify-between my-10">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm bằng số vé"
          suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
          bordered={false}
          className="bg-lightGray max-w-md rounded-lg p-3"
        />
        <div className="flex align-baseline gap-3">
          <button className="btnTicket" onClick={showModal}>
            <FiFilter />
            Lọc vé
          </button>
          <TicketModal
            ticketData={ticketData}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setFilteredData={setFilteredData}
          />
          <CSVLink className="btnTicket" data={ticketData}>
            Xuất file (.csv)
          </CSVLink>
        </div>
      </div>
      <Table
        loading={loading}
        dataSource={error ? undefined : filteredData}
        columns={columns}
        pagination={{ position: ["bottomCenter"], itemRender }}
      />
    </div>
  );
};

export default Ticket;
