import { useState } from "react";
import circle from "../../../assets/icons/write/circle.svg";

const YearAndMonthCondition = ({ onChange }) => {
  const [selectedYear, setSelectedYear] = useState(""); // 연도 상태
  const [selectedMonth, setSelectedMonth] = useState(""); // 월 상태

  // 연도 변경 시 상태 업데이트 및 상위 컴포넌트로 전달
  const handleYearChange = (event) => {
    const year = event.target.value.replace("년", ""); // "2022년" -> "2022"
    setSelectedYear(year);
    // 연도와 월이 모두 선택된 경우 상위 컴포넌트로 전달
    if (year && selectedMonth) {
      onChange(year, selectedMonth);
    }
  };

  // 월 변경 시 상태 업데이트 및 상위 컴포넌트로 전달
  const handleMonthChange = (event) => {
    const month = event.target.value.replace("월", ""); // "1월" -> "1"
    setSelectedMonth(month);
    // 연도와 월이 모두 선택된 경우 상위 컴포넌트로 전달
    if (selectedYear && month) {
      onChange(selectedYear, month);
    }
  };

  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">년 / 월</div>
        <div>
          <select
            className="p-2 w-44 border rounded-s border-gray-300 mr-3"
            onChange={handleYearChange}
          >
            <option value="">선택</option>
            <option>2023년</option>
            <option>2022년</option>
            <option>2021년</option>
            <option>2020년</option>
          </select>
          <select
            className="p-2 w-44 border rounded-s border-gray-300"
            onChange={handleMonthChange}
          >
            <option value="">선택</option>
            <option>1월</option>
            <option>2월</option>
            <option>3월</option>
            <option>4월</option>
            <option>5월</option>
            <option>6월</option>
            <option>7월</option>
            <option>8월</option>
            <option>9월</option>
            <option>10월</option>
            <option>11월</option>
            <option>12월</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default YearAndMonthCondition;
