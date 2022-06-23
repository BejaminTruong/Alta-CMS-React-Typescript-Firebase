import React, { FC } from "react";
import { Area } from "@ant-design/plots";
import CustomDatePicker from "./CustomDatePicker";

const data = [
  { day: "Thứ 2", value: 150000000 },
  { day: "Thứ 3", value: 220000000 },
  { day: "Thứ 4", value: 160000000 },
  { day: "Thứ 5", value: 250000000 },
  { day: "Thứ 6", value: 280000000 },
  { day: "Thứ 7", value: 180000000 },
  { day: "CN", value: 190000000 },
];

const config = {
  data,
  xField: "day",
  yField: "value",
  color: "#FAA05F",
  xAxis: {
    range: [0, 1],
  },
  yAxis: {
    range: [0, 1],
  },
  areaStyle: {
    fill: "l(270) 0:#ffffff 1:#FAA05F",
  },
  smooth: true,
};
const HomeAreaChart: FC = () => {
  return (
    <div className="py-5 pr-10">
      <div className="flex w-full justify-between my-5">
        <h2 className="text-xl font-bold">Doanh thu</h2>
        <CustomDatePicker />
      </div>
      <Area {...config} />
      <div className="my-10">
        <p className="font-medium text-lightBrown">Tổng doanh thu theo tuần</p>
        <h1 className="font-bold text-2xl">525.145.000 <span className="text-sm font-medium">đồng</span></h1>
      </div>
    </div>
  );
};

export default HomeAreaChart;
