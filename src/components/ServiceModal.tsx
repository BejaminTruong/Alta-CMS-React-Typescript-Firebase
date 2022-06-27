import { Checkbox, Input, Modal, Select } from "antd";
import React, { FC } from "react";
import CustomDatePicker from "./CustomDatePicker";
import CustomTimePicker from "./CustomTimePicker";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const { Option } = Select;

const ServiceModal: FC<Props> = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => setIsModalVisible(false);
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
      >
        <div>
          <p className="font-semibold text-base"><span className="text-normalRed">*</span> Tên gói vé</p>
          <Input
            placeholder="Nhập tên gói vé"
            className="w-1/2 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex gap-10 my-5 font-semibold text-base">
          <div className="flex flex-col">
            <p>Ngày áp dụng</p>
            <div className="flex gap-3">
              <CustomDatePicker />
              <CustomTimePicker />
            </div>
          </div>
          <div className="flex flex-col">
            <p>Ngày hết hạn</p>
            <div className="flex gap-3">
              <CustomDatePicker />
              <CustomTimePicker />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-base">Giá vé áp dụng</p>
          <div>
            <div className="flex items-baseline">
              <div className="flex gap-3">
                <Checkbox />
                <p>Vé lẻ (vnđ/vé) với giá</p>
              </div>
              <div className="flex gap-2 mx-2 items-baseline">
                <Input
                  bordered={false}
                  placeholder="Giá vé"
                  className="bg-extraLightGray w-36 rounded-lg py-2 px-3"
                />
                <span>/ vé</span>
              </div>
            </div>
            <div className="flex my-3">
              <div className="flex gap-3">
                <Checkbox />
                <p>Combo vé với giá</p>
              </div>
              <div className="flex gap-2 mx-2 items-baseline">
                <Input
                  bordered={false}
                  placeholder="Giá vé"
                  className="bg-extraLightGray w-36 rounded-lg py-2 px-3"
                />
                <span>/</span>
                <Input
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
          <p className="font-semibold text-base">Tình trạng</p>
          <Select defaultValue="Đang áp dụng" style={{width: "150px"}}>
            <Option value="Đang áp dụng">Đang áp dụng</Option>
            <Option value="Tắt">Tắt</Option>
          </Select>
          <p className="italic my-3 text-xs text-lightBrown"><span className="text-normalRed">*</span> là thông tin bắt buộc</p>
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={handleCancel} className="btnTicket px-12">
            Hủy
          </button>
          <button
            onClick={handleOk}
            className="btnTicket bg-normalOrange text-white px-12"
          >
            Lưu
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceModal;
