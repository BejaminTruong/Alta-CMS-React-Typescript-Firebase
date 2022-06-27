import { TimePicker } from "antd";
import moment from "moment";
import type { Moment } from "moment";
import React, { FC } from "react";

type Props = {};

const onChange = (time: Moment | null, timeString: string) => {
  console.log(time, timeString);
};

const CustomTimePicker: FC = (props: Props) => {
  return (
    <div>
      <TimePicker showNow={false} onChange={onChange} placeholder="hh:mm:ss" />
    </div>
  );
};

export default CustomTimePicker;
