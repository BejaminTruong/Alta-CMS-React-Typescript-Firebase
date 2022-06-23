import { Pie } from "@ant-design/charts";
import { FC } from "react";

type Props = {
  title: string;
};

type LableCfg = {
  type: string | boolean
}

const HomeDonutChart: FC<Props> = ({ title }) => {
  const data = [
    {
      type: "value1",
      value: 28302,
    },
    {
      type: "value2",
      value: 30256,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    color: ['#4F75FF', '#FF8A48'],
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    innerRadius: 0.4,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: true,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
    height: 300
  };
  return (
    <div className="w-1/4">
      <h2 className="text-center font-bold text-xl">{title}</h2>
      <Pie {...config}/>
    </div>
  );
};

export default HomeDonutChart;
