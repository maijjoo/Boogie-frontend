import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";

// range 함수: 주어진 범위의 숫자 배열을 생성
const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const DatePickerComponent = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);

  // 오늘 날짜
  const today = new Date();

  // 19년 전 날짜 (최대 선택 가능한 날짜)
  const nineteenYearsAgo = new Date(
    today.getFullYear() - 19,
    today.getMonth(),
    today.getDate()
  );

  // 70년 전 날짜 (최소 선택 가능한 날짜)
  const seventyFiveYearsAgo = new Date(
    today.getFullYear() - 70,
    today.getMonth(),
    today.getDate()
  );

  // 연도 목록 (70년 전부터 19년 전까지)
  const years = range(
    getYear(seventyFiveYearsAgo), // 70년 전
    getYear(nineteenYearsAgo) + 1 // 19년 전
  );

  // 월 목록 (1월 ~ 12월)
  const months = [
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

  return (
    <DatePicker
      className="w-56 border-b border-b-gray-300 text-right"
      selected={startDate} // 선택된 날짜 상태
      onChange={(date) => {
        setStartDate(date);
        onChange(date);
      }} // 날짜 변경 핸들러
      dateFormat="yyyy-MM-dd" // 날짜 형식 지정
      minDate={seventyFiveYearsAgo} // 70년 전부터 선택 가능
      maxDate={nineteenYearsAgo} // 19년 전까지만 선택 가능
      placeholderText="날짜를 선택하세요" // 플레이스홀더 텍스트
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* 이전 달 버튼 */}
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>

          {/* 연도 선택 드롭다운 */}
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* 월 선택 드롭다운 */}
          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* 다음 달 버튼 */}
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
    />
  );
};

export default DatePickerComponent;
