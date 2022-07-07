import moment from "moment";
import { FC } from "react";
import CustomDatePicker from "../components/CustomDatePicker";
import HomeAreaChart from "../components/HomeAreaChart";
import HomeDonutChart from "../components/HomeDonutChart";

const Home: FC = () => {
  return (
    <div className="mainContainer">
      <h1 className="text-4xl font-bold">Thống kê</h1>
      <HomeAreaChart />
      <div className="flex justify-evenly">
        <CustomDatePicker defaultDate={moment()}/>
        <HomeDonutChart title="Gói gia đình"/>
        <HomeDonutChart title="Gói sự kiện"/>
        <div className="flex flex-col gap-4 font-medium">
          <div className="flex align-baseline">
            <div className="w-11 h-5 rounded bg-normalBlue inline-block mr-4"></div>
            <span>Vé đã sử dụng</span>
          </div>
          <div className="flex align-baseline">
            <div className="w-11 h-5 rounded bg-normalOrange inline-block mr-4"></div>
            <span>Vé chưa sử dụng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
