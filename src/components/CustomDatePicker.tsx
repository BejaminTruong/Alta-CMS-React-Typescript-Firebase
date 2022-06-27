import { DatePicker, DatePickerProps, Radio, RadioChangeEvent } from "antd";
import moment from "moment";
import { FC, useState } from "react";

type Props = {
  format?: string;
};

type PickerType = "time" | "date" | "week" | "month" | "quarter" | "year" | undefined

const CustomDatePicker: FC<Props> = ({ format = "MM/YYYY" }) => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
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
        placeholder="dd/mm/yy"
        onChange={onChange}
        format={format}
        renderExtraFooter={() => (
          <Radio.Group className="flex justify-center my-3" onChange={onChangePickerType} value={value}>
            <Radio value="date">Theo ngày</Radio>
            <Radio value="week">Theo tuần</Radio>
          </Radio.Group>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
