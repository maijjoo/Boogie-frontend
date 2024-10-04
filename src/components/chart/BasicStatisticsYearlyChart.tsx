import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const data = [
  {
    name: "2019년",
    폐어구류: 4000,
    초목류: 2400,
    "대형 투기쓰레기류": 2400,
    생활쓰레기류: 1000,
    부표류: 1200,
  },
  {
    name: "2020년",
    폐어구류: 3000,
    초목류: 1398,
    "대형 투기쓰레기류": 2210,
    생활쓰레기류: 1500,
    부표류: 1300,
  },
  {
    name: "2021년",
    폐어구류: 2000,
    초목류: 9800,
    "대형 투기쓰레기류": 2290,
    생활쓰레기류: 1600,
    부표류: 1100,
  },
  {
    name: "2022년",
    폐어구류: 2780,
    초목류: 3908,
    "대형 투기쓰레기류": 2000,
    생활쓰레기류: 1700,
    부표류: 1400,
  },
  {
    name: "2023년",
    폐어구류: 1890,
    초목류: 4800,
    "대형 투기쓰레기류": 2181,
    생활쓰레기류: 1800,
    부표류: 1500,
  },
];

const BasicStatisticsYearlyChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20, // 차트 오른쪽 여백
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="10%" // 막대 간 및 차트 여백 설정
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          wrapperStyle={{
            paddingLeft: "40px", // 범례와 차트 사이의 여백 추가
          }}
        />
        <Bar dataKey="폐어구류" stackId="a" fill="#4a90e2" barSize={80} />
        <Bar dataKey="초목류" stackId="a" fill="#8884d8" barSize={80} />
        <Bar
          dataKey="대형 투기쓰레기류"
          stackId="a"
          fill="#82ca9d"
          barSize={80}
        />
        <Bar dataKey="생활쓰레기류" stackId="a" fill="#ffc658" barSize={80} />
        <Bar dataKey="부표류" stackId="a" fill="#ff8c42" barSize={80} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BasicStatisticsYearlyChart;
