import { Checkbox, Input, Modal, Select } from "antd";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  addData,
  ServiceListType,
  updateData,
} from "../features/service/service.Slice";
import CustomDatePicker from "./CustomDatePicker";
import CustomTimePicker from "./CustomTimePicker";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  fetcher: () => Promise<void>;
  editValue: ServiceListType | undefined;
  setEditValue: React.Dispatch<
    React.SetStateAction<ServiceListType | undefined>
  >;
};

export type FormValue = {
  key?: string;
  comboCode?: string;
  comboName?: string;
  applyDate?: Timestamp;
  expiryDate?: Timestamp;
  applyTime?: string;
  expiryTime?: string;
  ticketPrice?: number;
  comboPrice?: number;
  comboNumber?: number;
  status?: string;
};

const { Option } = Select;

const ServiceModal: FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  fetcher,
  editValue,
  setEditValue,
}) => {
  const [formValue, setFormValue] = useState<FormValue>();
  const [comboName, setComboName] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<number>();
  const [comboPrice, setComboPrice] = useState<number>();
  const [comboNumber, setComboNumber] = useState<number>();
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [status, setStatus] = useState<string>("Đang áp dụng");
  const [checkedPrice, setCheckedPrice] = useState(true);
  const [checkedComboPrice, setCheckedComboPrice] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatchAndFetch();
  }, [formValue]);

  const dispatchAndFetch = async () => {
    if (formValue) {
      if (editValue) {
        await dispatch(updateData(formValue as FormValue));
      } else {
        await dispatch(addData(formValue as FormValue));
      }
      fetcher();
    }
  };

  const handleOk = () => {
    if (editValue) {
      let applyDate = Timestamp.fromDate(
        moment(editValue.applyDate, "DD/MM/YYYY").toDate()
      );
      let expiryDate = Timestamp.fromDate(
        moment(editValue.expiryDate, "DD/MM/YYYY").toDate()
      );
      let applyTime = editValue.applyTime;
      let expiryTime = editValue.expiryTime;
      if (startDate && endDate) {
        applyDate = Timestamp.fromDate(moment(startDate).toDate());
        expiryDate = Timestamp.fromDate(moment(endDate).toDate());
      }
      if (startTime && endTime) {
        applyTime = startTime;
        expiryTime = endTime;
      }
      const { key } = editValue;
      setFormValue({
        key,
        comboName,
        ticketPrice,
        comboPrice,
        comboNumber,
        applyDate,
        expiryDate,
        applyTime,
        expiryTime,
        status,
      });
    } else {
      setFormValue({
        comboName,
        ticketPrice,
        comboPrice,
        comboNumber,
        applyDate: Timestamp.fromDate(moment(startDate).toDate()),
        expiryDate: Timestamp.fromDate(moment(endDate).toDate()),
        applyTime: startTime,
        expiryTime: endTime,
        status,
      });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setEditValue(undefined);
    setIsModalVisible(false)
  };
  return (
    <div className="hidden">
      <Modal
        centered
        closable={false}
        footer={null}
        title="Thêm gói vé"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={700}
        destroyOnClose={true}
      >
        <div>
          <p className="modalHeading">
            <span className="text-normalRed">*</span> Tên gói vé
          </p>
          <Input
            onChange={(e) => setComboName(e.target.value)}
            defaultValue={editValue ? editValue.comboName : comboName}
            placeholder="Nhập tên gói vé"
            className="w-1/2 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex gap-10 my-5 modalHeading">
          <div className="flex flex-col">
            <p>Ngày áp dụng</p>
            <div className="flex gap-3">
              <CustomDatePicker
                defaultDate={
                  editValue
                    ? moment(editValue.applyDate, "DD/MM/YYYY")
                    : undefined
                }
                setStartDate={setStartDate}
                format="DD/MM/YYYY"
              />
              <CustomTimePicker
                defaultTime={
                  editValue
                    ? moment(editValue.applyTime, "hh:mm:ss")
                    : undefined
                }
                setStartTime={setStartTime}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p>Ngày hết hạn</p>
            <div className="flex gap-3">
              <CustomDatePicker
                defaultDate={
                  editValue
                    ? moment(editValue.expiryDate, "DD/MM/YYYY")
                    : undefined
                }
                setEndDate={setEndDate}
                format="DD/MM/YYYY"
              />
              <CustomTimePicker
                defaultTime={
                  editValue
                    ? moment(editValue.expiryTime, "hh:mm:ss")
                    : undefined
                }
                setEndTime={setEndTime}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="modalHeading">Giá vé áp dụng</p>
          <div className="modalHeading font-medium">
            <div className="flex items-baseline">
              <div className="flex gap-3">
                <Checkbox
                  onChange={(e) => setCheckedPrice(!e.target.checked)}
                />
                <p className="translate-y-1">Vé lẻ (vnđ/vé) với giá</p>
              </div>
              <div className="flex gap-2 mx-2 items-baseline">
                <Input
                  disabled={checkedPrice}
                  onChange={(e) => setTicketPrice(+e.target.value)}
                  style={{ fontStyle: "normal" }}
                  bordered={false}
                  placeholder="Giá vé"
                  className="bg-extraLightGray w-36 rounded-lg py-2 px-3"
                  defaultValue={editValue ? editValue.ticketPrice : ticketPrice}
                />
                <span>/ vé</span>
              </div>
            </div>
            <div className="flex my-3">
              <div className="flex gap-3">
                <Checkbox
                  onChange={(e) => setCheckedComboPrice(!e.target.checked)}
                />
                <p className="translate-y-1">Combo vé với giá</p>
              </div>
              <div className="flex gap-2 mx-2 items-baseline">
                <Input
                  disabled={checkedComboPrice}
                  onChange={(e) => setComboPrice(+e.target.value)}
                  style={{ fontStyle: "normal" }}
                  bordered={false}
                  placeholder="Giá vé"
                  className="bg-extraLightGray w-36 rounded-lg py-2 px-3"
                  defaultValue={editValue ? editValue.comboPrice : comboPrice}
                />
                <span>/</span>
                <Input
                  disabled={checkedComboPrice}
                  onChange={(e) => setComboNumber(+e.target.value)}
                  style={{ fontStyle: "normal" }}
                  bordered={false}
                  placeholder="Số vé"
                  className="bg-extraLightGray w-20 rounded-lg py-2 px-3"
                  defaultValue={editValue ? editValue.comboNumber : comboNumber}
                />
                <span>vé</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="modalHeading">Tình trạng</p>
          <Select
            onChange={(value) => setStatus(value)}
            defaultValue={editValue ? editValue.status : status}
            style={{ width: "170px" }}
          >
            <Option value="Đang áp dụng">Đang áp dụng</Option>
            <Option value="Tắt">Tắt</Option>
          </Select>
          <p className="italic my-3 text-xs text-lightBrown">
            <span className="text-normalRed">*</span> là thông tin bắt buộc
          </p>
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

export default ServiceModal;
