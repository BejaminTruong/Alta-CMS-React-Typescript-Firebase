import { Modal } from "antd";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { FC, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  TicketListType,
  updateIssueDate,
} from "../features/ticket/ticketSlice";
import CustomDatePicker from "./CustomDatePicker";

type Props = {
  isModalVisible2: boolean;
  setIsModalVisible2: React.Dispatch<React.SetStateAction<boolean>>;
  recordData: TicketListType | undefined;
  fetcher: () => Promise<void>;
};

export type TicketIssueDate = {
  key?: string;
  issueDate?: Timestamp;
};

const TableTicketModal: FC<Props> = ({
  isModalVisible2,
  setIsModalVisible2,
  recordData,
  fetcher,
}) => {
  const dispatch = useAppDispatch();
  const [endDate, setEndDate] = useState<number>();

  const handleCancel = () => setIsModalVisible2(false);

  const handleOk = async () => {
    let ticketIssueDateObj: TicketIssueDate = {
      key: recordData?.key,
      issueDate: Timestamp.fromDate(moment(endDate).toDate()),
    };
    await dispatch(updateIssueDate(ticketIssueDateObj));
    fetcher();
    setIsModalVisible2(false);
  };

  return (
    <div className="hidden">
      <Modal
        centered
        closable={false}
        footer={null}
        title="Đổi ngày sử dụng vé"
        visible={isModalVisible2}
        onCancel={handleCancel}
        width={600}
        destroyOnClose={true}
      >
        <div className="flex text-base text-darkestBrown mb-7">
          <div className="flex flex-col gap-5 w-1/3 font-semibold">
            <p>Mã vé</p>
            <p>Loại vé</p>
            <p>Tên sự kiện</p>
            <p className="mt-2">Hạn sử dụng</p>
          </div>
          <div className="flex flex-col gap-5 w-2/3 font-medium">
            <p>{recordData?.bookingCode}</p>
            <p>Vé cổng - Gói sự kiện</p>
            <p>{recordData?.eventName}</p>
            <CustomDatePicker
              setEndDate={setEndDate}
              defaultDate={moment(recordData?.issueDate, "DD/MM/YYYY")}
              format="DD/MM/YYYY"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={handleCancel} className="btnTicket px-16">
            Hủy
          </button>
          <button
            onClick={handleOk}
            className="btnTicket bg-normalOrange text-white px-16"
          >
            Lưu
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TableTicketModal;
