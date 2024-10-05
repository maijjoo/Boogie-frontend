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

const BasicStatisticsMonthlyChart = ({ data }) => {
  const fixedMonths = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const filledData = fixedMonths.map((month) => {
    const found = data.find((item) => item.name === month);
    return (
      found || {
        name: month,
        폐어구류: 0,
        초목류: 0,
        "대형 투기쓰레기류": 0,
        생활쓰레기류: 0,
        부표류: 0,
      }
    );
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={filledData} // 부모 컴포넌트에서 받은 데이터로 차트를 렌더링
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="10%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" ticks={fixedMonths} />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ paddingLeft: "40px" }} />
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

export default BasicStatisticsMonthlyChart;
