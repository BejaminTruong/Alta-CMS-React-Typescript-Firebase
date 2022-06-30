import {
  CaretLeftOutlined,
  CaretRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
import { Input, PaginationProps, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CustomTag from "../components/CustomTag";
import {
  fetchData,
  selectService,
  ServiceListType,
} from "../features/service/service.Slice";
import ServiceModal from "../components/ServiceModal";

const columns: ColumnsType<ServiceListType> = [
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
    render: (text) => <p>{text} VNĐ</p>,
  },
  {
    title: "Giá Combo (VNĐ/Combo)",
    dataIndex: "comboPrice",
    key: "comboPrice",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    render: (text) => <CustomTag name={text} />,
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: () => (
      <p className="text-normalOrange text-base flex gap-1 cursor-pointer">
        <FiEdit className="text-2xl" /> Cập nhật
      </p>
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

const Service: FC = () => {
  const serviceData = useAppSelector(selectService);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    if (searchTerm === "") {
      fetcher();
    }
  }, [searchTerm]);
  const dispatch = useAppDispatch();
  const fetcher = async () => {
    setLoading(true);
    const fetchedServices = await dispatch(fetchData());
    if (fetchedServices) setLoading(false);
  };
  const { error } = useSWR("service/get", fetcher);

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div className="mainContainer">
      <h1 className="text-4xl font-bold">Danh sách gói vé</h1>
      <div className="flex justify-between my-10">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm bằng mã gói"
          suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
          bordered={false}
          className="bg-lightGray max-w-md rounded-lg p-3"
        />
        <div className="flex align-baseline gap-3">
          <button className="btnTicket">Xuất file (.csv)</button>
          <button onClick={showModal} className="btnTicket">
            Thêm gói vé
          </button>
          <ServiceModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </div>
      </div>
      <Table
        loading={loading}
        dataSource={
          error
            ? undefined
            : serviceData.filter((e) =>
                e.comboCode.toLowerCase().includes(searchTerm.toLowerCase())
              )
        }
        columns={columns}
        pagination={{ position: ["bottomCenter"], itemRender }}
      />
    </div>
  );
};

export default Service;
