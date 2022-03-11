import React, { useContext } from "react";
import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";
import {
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionDownRight,
  WiDirectionLeft,
  WiDirectionRight,
  WiDirectionUp,
  WiDirectionUpLeft,
  WiDirectionUpRight,
} from "react-icons/wi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const formatXAxis = (data) => `${new Date(data * 1000).getHours()}시`;

function WindDirection({ degree, ...props }) {
  switch (true) {
    case (337.5 <= degree && degree <= 360) || (0 <= degree && degree < 22.5):
      return <WiDirectionDown {...props} />;
    case 22.5 <= degree && degree < 67.5:
      return <WiDirectionDownLeft {...props} />;
    case 67.5 <= degree && degree < 112.5:
      return <WiDirectionLeft {...props} />;
    case 112.5 <= degree && degree < 157.5:
      return <WiDirectionUpLeft {...props} />;
    case 157.5 <= degree && degree < 202.5:
      return <WiDirectionUp {...props} />;
    case 202.5 <= degree && degree < 247.5:
      return <WiDirectionUpRight {...props} />;
    case 247.5 <= degree && degree < 292.5:
      return <WiDirectionRight {...props} />;
    case 292.5 <= degree && degree < 337.5:
      return <WiDirectionDownRight {...props} />;
    default:
      return;
  }
}

const CustomizedContent = function ({ x, y, value }) {
  return <WindDirection degree={value} x={x + 15} y={y - 40} fontSize={30} />;
};

const CustomizedLabel = function ({ x, y, value }) {
  return (
    <text x={x + 30} y={y - 2} dy={0} fontSize="15" textAnchor="middle">
      {value}m/s
    </text>
  );
};

function BarGraph({ num }) {
  const { hourly } = useContext(WeatherContext);
  return (
    <BarChart
      width={960}
      height={200}
      data={hourly
        ?.slice(num * 12, (num + 1) * 12)
        .map(({ dt, wind_speed, wind_deg }) => ({ dt, wind_speed, wind_deg }))}
      margin={{ top: 50, right: 30, left: 30, bottom: 5 }}
    >
      <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis} />
      <Bar
        dataKey="wind_speed"
        fill="#00DD93"
        isAnimationActive={false}
        label={<CustomizedLabel />}
      >
        <LabelList dataKey="wind_deg" content={<CustomizedContent />} />
      </Bar>
    </BarChart>
  );
}

function WindGraph() {
  const slides = [];

  for (let i = 0; i < 2; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <BarGraph num={i} />
      </SwiperSlide>
    );
  }
  return (
    <Swiper navigation={true} modules={[Navigation]}>
      {slides}
    </Swiper>
  );
}

export default WindGraph;
