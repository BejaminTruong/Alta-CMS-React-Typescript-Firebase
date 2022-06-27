import { Button, Checkbox, Col, Modal, Radio, Row } from "antd";
import { FC, useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TicketModal: FC<Props> = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => setIsModalVisible(false);
  return (
    <div className="hidden">
      <Modal
        centered
        closable={false}
        footer={null}
        title="Lọc vé"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={600}
      >
        <div className="flex justify-between mb-5">
          <div>
            <p className="modalHeading">Từ ngày</p>
            <CustomDatePicker />
          </div>
          <div>
            <p className="modalHeading">Đến ngày</p>
            <CustomDatePicker />
          </div>
        </div>
        <div>
          <p className="modalHeading">Tình trạng sử dụng</p>
          <Radio.Group defaultValue={1}>
            <Radio value={1}>Tất cả</Radio>
            <Radio value={2}>Đã sử dụng</Radio>
            <Radio value={3}>Chưa sử dụng</Radio>
            <Radio value={4}>Hết hạn</Radio>
          </Radio.Group>
        </div>
        <div className="my-5">
          <p>Cổng Check - in</p>
          <Checkbox.Group style={{ width: "100%" }} defaultValue={["A"]}>
            <Row>
              <Col span={8}>
                <Checkbox value="A">Tất cả</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="B">Cổng 1</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="C">Cổng 2</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="D">Cổng 3</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="E">Cổng 4</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="E">Cổng 5</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </div>
        <button onClick={handleOk} className="btnTicket px-12 mx-auto">Lọc</button>
      </Modal>
    </div>
  );
};

export default TicketModal;
