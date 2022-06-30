import { Checkbox, Col, Modal, Radio, RadioChangeEvent, Row } from "antd";
import { FC } from "react";
import { useAppDispatch } from "../app/hooks";
import { filterStatus } from "../features/ticket/ticketSlice";
import CustomDatePicker from "./CustomDatePicker";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TicketModal: FC<Props> = ({ isModalVisible, setIsModalVisible }) => {
  const dispatch = useAppDispatch();
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => setIsModalVisible(false);
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    dispatch(filterStatus(e.target.value))
  };

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
        <div className="flex mb-5">
          <div className="w-1/2">
            <p className="modalHeading">Từ ngày</p>
            <CustomDatePicker format="DD/MM/YYYY" />
          </div>
          <div className="w-1/2">
            <p className="modalHeading">Đến ngày</p>
            <CustomDatePicker format="DD/MM/YYYY" />
          </div>
        </div>
        <div>
          <p className="modalHeading text-darkestBrown">Tình trạng sử dụng</p>
          <Radio.Group onChange={onChange} defaultValue="">
            <Radio value="">Tất cả</Radio>
            <Radio value="Đã sử dụng">Đã sử dụng</Radio>
            <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
            <Radio value="Hết hạn">Hết hạn</Radio>
          </Radio.Group>
        </div>
        <div className="my-5">
          <p className="modalHeading text-darkestBrown">Cổng Check - in</p>
          <Checkbox.Group style={{ width: "100%" }} defaultValue={["A"]}>
            <Row>
              <Col span={8}>
                <Checkbox value="">Tất cả</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Cổng 1">Cổng 1</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Cổng 2">Cổng 2</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Cổng 3">Cổng 3</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Cổng 4">Cổng 4</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Cổng 5">Cổng 5</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </div>
        <button onClick={handleOk} className="btnTicket px-16 mx-auto">
          Lọc
        </button>
      </Modal>
    </div>
  );
};

export default TicketModal;
