import _, { indexOf } from "lodash";
import { Checkbox, Col, Modal, Radio, Row } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { FC, useEffect, useState } from "react";
import { TicketListType } from "../features/ticket/ticketSlice";
import CustomDatePicker from "./CustomDatePicker";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredData: React.Dispatch<React.SetStateAction<TicketListType[]>>;
  ticketData: TicketListType[];
  fetcher: () => Promise<void>;
};

const TicketModal: FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  setFilteredData,
  ticketData,
  fetcher,
}) => {
  const [checkedStatus, setCheckedStatus] = useState<string>("");
  const [checkedGate, setCheckedGate] = useState<CheckboxValueType[]>([""]);
  const [timeRange, setTimeRange] = useState()
  useEffect(() => {
    console.log(checkedGate);
  }, [checkedGate]);

  const handleOk = () => {
    let finalFilteredData;
    if (checkedStatus === "" && _.isEqual(checkedGate, [""])) fetcher();
    if (checkedStatus !== "")
      finalFilteredData = ticketData.filter(
        (e) => e.status.toLowerCase() === checkedStatus.toLowerCase()
      );
    if (!_.isEqual(checkedGate, [""]))
      finalFilteredData = ticketData.filter((e) =>
        _.includes(checkedGate, e.checkInGate)
      );
    if (checkedStatus !== "" && !_.isEqual(checkedGate, [""]))
      finalFilteredData = ticketData.filter(
        (e) =>
          e.status.toLowerCase() === checkedStatus.toLowerCase() &&
          _.includes(checkedGate, e.checkInGate)
      );
    setFilteredData(finalFilteredData as TicketListType[]);
    setIsModalVisible(false);
  };
  const handleCancel = () => setIsModalVisible(false);
  const handleCheckedOne = () => {
    if (_.isEqual(checkedGate, [""])) {
      checkedGate.pop();
      setCheckedGate(checkedGate);
    }
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
            <CustomDatePicker setTimeRange={setTimeRange} format="DD/MM/YYYY" />
          </div>
          <div className="w-1/2">
            <p className="modalHeading">Đến ngày</p>
            <CustomDatePicker setTimeRange={setTimeRange} format="DD/MM/YYYY" />
          </div>
        </div>
        <div>
          <p className="modalHeading text-darkestBrown">Tình trạng sử dụng</p>
          <Radio.Group
            onChange={(e) => {
              setCheckedStatus(e.target.value);
            }}
            defaultValue={checkedStatus}
          >
            <Radio value="">Tất cả</Radio>
            <Radio value="Đã sử dụng">Đã sử dụng</Radio>
            <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
            <Radio value="Hết hạn">Hết hạn</Radio>
          </Radio.Group>
        </div>
        <div className="my-5">
          <p className="modalHeading text-darkestBrown">Cổng Check - in</p>
          <Checkbox.Group
            onChange={(checkedValues) => {
              if (checkedValues.includes("")) {
                checkedValues = [""];
              }
              setCheckedGate(checkedValues);
            }}
            style={{ width: "100%" }}
            defaultValue={checkedGate}
          >
            <Row>
              <Col span={8}>
                <Checkbox onChange={handleCheckedOne} value="">
                  Tất cả
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox onChange={handleCheckedOne} value="Cổng 1">
                  Cổng 1
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox onChange={handleCheckedOne} value="Cổng 2">
                  Cổng 2
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox onChange={handleCheckedOne} value="Cổng 3">
                  Cổng 3
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox onChange={handleCheckedOne} value="Cổng 4">
                  Cổng 4
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox onChange={handleCheckedOne} value="Cổng 5">
                  Cổng 5
                </Checkbox>
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
