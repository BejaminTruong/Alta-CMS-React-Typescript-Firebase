import { DatePicker, DatePickerProps, Radio, RadioChangeEvent } from "antd";
import moment from "moment";
import { FC, useState } from "react";

type Props = {
  format?: string;
  placeholder?: string;
  setTimeRange?: React.Dispatch<React.SetStateAction<undefined>>
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
  setTimeRange
}) => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    // setTimeRange({})
  };
  const [value, setValue] = useState<PickerType>("date");

  const onChangePickerType = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <DatePicker
        showToday={value !== undefined ? false : undefined}
        picker={value}
        placeholder={placeholder}
        onChange={onChange}
        format={format}
        defaultValue={moment()}
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
