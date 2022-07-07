import { DatePicker, DatePickerProps, Radio, RadioChangeEvent } from "antd";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FormValue } from "./ServiceModal";

type Props = {
  format?: string;
  placeholder?: string;
  setStartDate?: Dispatch<SetStateAction<number | undefined>>;
  setEndDate?: Dispatch<SetStateAction<number | undefined>>;
  getStartDate?: () => moment.Moment;
  getEndDate?: () => moment.Moment;
  defaultDate?: moment.Moment;
};

type PickerType =
  | "time"
  | "date"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | undefined;

const CustomDatePicker: FC<Props> = ({
  format = "MM/YYYY",
  placeholder = "dd/mm/yy",
  setStartDate,
  setEndDate,
  getStartDate,
  getEndDate,
  defaultDate,
}) => {
  const [value, setValue] = useState<PickerType>("date");
  
  if (getStartDate) defaultDate = getStartDate();
  if (getEndDate) defaultDate = getEndDate();

  const onChangePickerType = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      if (setStartDate) setStartDate(date.valueOf());
      if (setEndDate) setEndDate(date.valueOf());
    }
  };

  return (
    <div>
      <DatePicker
        showToday={value !== undefined ? false : undefined}
        picker={value}
        placeholder={placeholder}
        onChange={onChange}
        format={format}
        defaultValue={defaultDate}
        renderExtraFooter={() => (
          <Radio.Group
            className="flex justify-center my-3"
            onChange={onChangePickerType}
            value={value}
          >
            <Radio value="date" style={{ fontSize: "14px" }}>
              Theo ngày
            </Radio>
            <Radio value="week" style={{ fontSize: "14px" }}>
              Theo tuần
            </Radio>
          </Radio.Group>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
