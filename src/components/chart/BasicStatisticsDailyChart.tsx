import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate(); // month가 0이면 이전 달의 마지막 일수 반환
};

const BasicStatisticsDailyChart = ({ data, selectedYears, selectedMonth }) => {
  // 선택한 연도와 월을 기반으로 일 배열 생성
  const fixedDays = useMemo(() => {
    if (!selectedYears || !selectedMonth) return []; // 연도나 월이 없으면 빈 배열 반환
    const daysCount = getDaysInMonth(selectedYears, selectedMonth);
    return Array.from({ length: daysCount }, (_, index) => `${index + 1}일`); // "1일", "2일" 형식의 배열 생성
  }, [selectedYears, selectedMonth]);

  const filledData = useMemo(() => {
    return fixedDays.map((day) => {
      const found = data.find((item) => item.name === day);
      return (
        found || {
          name: day,
          폐어구류: 0,
          초목류: 0,
          대형투기쓰레기류: 0,
          생활쓰레기류: 0,
          부표류: 0,
          합계: 0,
        }
      );
    });
  }, [data, fixedDays]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={filledData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          ticks={fixedDays}
          interval={0}
          tick={{ fontSize: 16 }}
        />

        <YAxis />
        <Tooltip />
        <Legend />
        {/* 각 Line에 지정된 색상 적용 */}
        <Line
          type="monotone"
          dataKey="합계"
          stroke="#b0b0b0  "
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="폐어구류"
          stroke="#4a90e2"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="초목류"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="대형투기쓰레기류"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="생활쓰레기류"
          stroke="#ffc658"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="부표류"
          stroke="#ff8c42"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BasicStatisticsDailyChart;
