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
};

export type FormValue = {
  key?: string;
  comboName?: string;
  applyDate?: Timestamp;
  expiryDate?: Timestamp;
  ticketPrice?: number;
  comboPrice?: number;
  status?: string;
};

const { Option } = Select;

const ServiceModal: FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  fetcher,
  editValue,
}) => {
  const [formValue, setFormValue] = useState<FormValue>();
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [serviceStatus, setServiceStatus] = useState<string>("Đang áp dụng");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formValue) {
      const isEmpty = Object.values(formValue as {}).every((e) => !e);
      if (isEmpty) console.log("form is empty or not enough");
      if (formValue.applyDate && formValue.expiryDate && !editValue) {
        dispatch(addData(formValue as FormValue));
      } else {
        dispatch(updateData(formValue as FormValue));
      }
    }
  }, [formValue]);

  useEffect(() => {
    setFormValue((prev) => ({ ...prev, status: serviceStatus }));
  }, [serviceStatus]);

  const handleOk = () => {
    let applyDate = Timestamp.fromDate(moment(startDate).toDate());
    let expiryDate = Timestamp.fromDate(moment(endDate).toDate());
    if (editValue) {
      const { key } = editValue;
      setFormValue((prev) => ({
        ...prev,
        key,
        applyDate,
        expiryDate,
      }));
    } else {
      setFormValue((prev) => ({
        ...prev,
        applyDate,
        expiryDate,
      }));
    }
    setIsModalVisible(false);
    fetcher();
  };

  const handleCancel = () => setIsModalVisible(false);
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
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                comboName: e.target.value,
              }))
            }
            defaultValue={editValue ? editValue.comboName : ""}
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
              <CustomTimePicker />
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
              <CustomTimePicker />
            </div>
          </div>
        </div>
        <div>
          <p className="modalHeading">Giá vé áp dụng</p>
          <div className="modalHeading font-medium">
            <div className="flex items-baseline">
              <div className="flex gap-3">
                <Checkbox />
                <p className="translate-y-1">Vé lẻ (vnđ/vé) với giá</p>
              </div>
              <div className="flex gap-2 mx-2 items-baseline">
                <Input
                  onChange={(e) =>
                    setFormValue((prev) => ({
                      ...prev,
                      ticketPrice: +e.target.value,
                    }))
                  }
                  style={{ fontStyle: "normal" }}
                  bordered={false}
                  placeholder="Giá vé"
                  className="bg-extraLightGray w-36 rounded-lg py-2 px-3"
                  defaultValue={editValue ? editValue.ticketPrice : undefined}
                />
                <span>/ vé</span>
              </div>
            </div>
            <div className="flex my-3">
              <div className="flex gap-3">
                <Checkbox />
                <p className="translate-y-1">Combo vé với giá</p>
              </div>
              <div className="flex gap-2 mx-2 items-baseline">
                <Input
                  onChange={(e) =>
                    setFormValue((prev) => ({
                      ...prev,
                      comboPrice: +e.target.value,
                    }))
                  }
                  style={{ fontStyle: "normal" }}
                  bordered={false}
                  placeholder="Giá vé"
                  className="bg-extraLightGray w-36 rounded-lg py-2 px-3"
                  defaultValue={editValue ? editValue.comboPrice : undefined}
                />
                <span>/</span>
                <Input
                  style={{ fontStyle: "normal" }}
                  bordered={false}
                  placeholder="Giá vé"
                  className="bg-extraLightGray w-20 rounded-lg py-2 px-3"
                />
                <span>vé</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="modalHeading">Tình trạng</p>
          <Select
            onChange={(status) => setServiceStatus(status)}
            defaultValue={editValue ? editValue.status : serviceStatus}
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
