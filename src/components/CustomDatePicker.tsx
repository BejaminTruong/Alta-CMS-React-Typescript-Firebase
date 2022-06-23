import { DatePicker, DatePickerProps } from "antd";
import moment from "moment";
import { FC } from "react";

type Props = {
  format?: string
}

const CustomDatePicker: FC<Props> = ({format = "MM/YYYY"}) => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <DatePicker
        onChange={onChange}
        // defaultValue={moment("22/06/2022", "DD/MM/YYYY")}
        format={format}
      />
    </div>
  );
};

export default CustomDatePicker;
