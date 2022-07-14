import _ from "lodash";
import { Checkbox, Col, Modal, Radio, Row } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { FC, useEffect, useState } from "react";
import { TicketListType } from "../features/ticket/ticketSlice";
import CustomDatePicker from "./CustomDatePicker";
import moment from "moment";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredData: React.Dispatch<React.SetStateAction<TicketListType[]>>;
  ticketData: TicketListType[];
};
const TicketModal: FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  setFilteredData,
  ticketData,
}) => {
  const [checkedStatus, setCheckedStatus] = useState<string>("");
  const [checkedGate, setCheckedGate] = useState<CheckboxValueType[]>([""]);
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  
  const handleOk = () => {
    let finalFilteredData;
    if (checkedStatus !== "") {
      if (startDate && endDate)
        finalFilteredData = ticketData.filter(
          (e) =>
            e.status.toLowerCase() === checkedStatus.toLowerCase() &&
            (startDate as number) <=
              moment(e.usageDate, "DD/MM/YYYY").valueOf() &&
            (endDate as number) >= moment(e.issueDate, "DD/MM/YYYY").valueOf()
        );
      else
        finalFilteredData = ticketData.filter(
          (e) => e.status.toLowerCase() === checkedStatus.toLowerCase()
        );
    }

    if (!_.isEqual(checkedGate, [""])) {
      if (startDate && endDate)
        finalFilteredData = ticketData.filter(
          (e) =>
            _.includes(checkedGate, e.checkInGate) &&
            (startDate as number) <=
              moment(e.usageDate, "DD/MM/YYYY").valueOf() &&
            (endDate as number) >= moment(e.issueDate, "DD/MM/YYYY").valueOf()
        );
      else
        finalFilteredData = ticketData.filter((e) =>
          _.includes(checkedGate, e.checkInGate)
        );
    }

    if (
      checkedStatus === "" &&
      _.isEqual(checkedGate, [""]) &&
      !startDate &&
      !endDate
    )
      finalFilteredData = ticketData;

    if (
      checkedStatus !== "" &&
      !_.isEqual(checkedGate, [""]) &&
      startDate &&
      endDate
    )
      finalFilteredData = ticketData.filter(
        (e) =>
          e.status.toLowerCase() === checkedStatus.toLowerCase() &&
          _.includes(checkedGate, e.checkInGate) &&
          (startDate as number) <=
            moment(e.usageDate, "DD/MM/YYYY").valueOf() &&
          (endDate as number) >= moment(e.issueDate, "DD/MM/YYYY").valueOf()
      );

    if (
      checkedStatus === "" &&
      _.isEqual(checkedGate, [""]) &&
      startDate &&
      endDate
    )
      finalFilteredData = ticketData.filter(
        (e) =>
          (startDate as number) <=
            moment(e.usageDate, "DD/MM/YYYY").valueOf() &&
          (endDate as number) >= moment(e.issueDate, "DD/MM/YYYY").valueOf()
      );

    if (
      checkedStatus !== "" &&
      !_.isEqual(checkedGate, [""]) &&
      !startDate &&
      !endDate
    )
      finalFilteredData = ticketData.filter(
        (e) =>
          e.status.toLowerCase() === checkedStatus.toLowerCase() &&
          _.includes(checkedGate, e.checkInGate)
      );

    setFilteredData(finalFilteredData as TicketListType[]);
    setIsModalVisible(false);
  };

  const handleCheckedOne = (e: CheckboxChangeEvent) => {
    if (_.isEqual(checkedGate, [""])) {
      setCheckedGate((prev) => prev.filter((c) => c !== ""));
    }
    if (!checkedGate.includes(e.target.value)) {
      setCheckedGate((prev) => [...prev, e.target.value]);
    } else {
      setCheckedGate((prev) => prev.filter((c) => c !== e.target.value));
    }
  };

  const getEndDate = () => {
    let temp = 0;
    ticketData.forEach((e) => {
      if (temp < moment(e.issueDate, "DD/MM/YYYY").valueOf())
        temp = moment(e.issueDate, "DD/MM/YYYY").valueOf();
    });
    return moment(temp);
  };

  const getStartDate = () => {
    let temp = Number.POSITIVE_INFINITY;
    ticketData.forEach((e) => {
      temp = Math.min(temp, moment(e.usageDate, "DD/MM/YYYY").valueOf());
    });
    return moment(temp);
  };

  return (
    <div className="hidden">
      <Modal
        centered
        closable={false}
        footer={null}
        title="Lọc vé"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <div className="flex mb-5">
          <div className="w-1/2">
            <p className="modalHeading">Từ ngày</p>
            <CustomDatePicker
              getStartDate={getStartDate}
              setStartDate={setStartDate}
              format="DD/MM/YYYY"
            />
          </div>
          <div className="w-1/2">
            <p className="modalHeading">Đến ngày</p>
            <CustomDatePicker
              getEndDate={getEndDate}
              setEndDate={setEndDate}
              format="DD/MM/YYYY"
            />
          </div>
        </div>
        <div>
          <p className="modalHeading text-darkestBrown">Tình trạng sử dụng</p>
          <Radio.Group
            onChange={(e) => setCheckedStatus(e.target.value)}
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
          <Checkbox.Group style={{ width: "100%" }} value={checkedGate}>
            <Row>
              <Col span={8}>
                <Checkbox onChange={() => setCheckedGate([""])} value="">
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
