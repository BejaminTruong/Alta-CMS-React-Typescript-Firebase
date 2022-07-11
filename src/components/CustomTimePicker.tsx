import { TimePicker } from "antd";
import type { Moment } from "moment";
import moment from "moment";
import React, { FC } from "react";

type Props = {
  setStartTime?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEndTime?: React.Dispatch<React.SetStateAction<string | undefined>>;
  defaultTime?: moment.Moment;
};

const CustomTimePicker: FC<Props> = ({
  setStartTime,
  setEndTime,
  defaultTime,
}) => {
  const onChange = (time: Moment | null, timeString: string) => {
    if (timeString) {
      if (setStartTime) setStartTime(timeString);
      if (setEndTime) setEndTime(timeString);
    }
  };
  return (
    <div>
      <TimePicker
        showNow={false}
        onChange={onChange}
        placeholder="hh:mm:ss"
        defaultValue={defaultTime}
      />
    </div>
  );
};

export default CustomTimePicker;
