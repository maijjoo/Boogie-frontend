import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";

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

const DateRangePicker = ({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onChange,
  isEditable,
  className,
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  // 부모 컴포넌트에서 전달된 initialStartDate, initialEndDate가 변경되면 상태 업데이트
  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  // 연도 범위 (현재 연도부터 1년 후까지)
  const currentYear = getYear(new Date());
  const years = Array.from(
    { length: 2 }, // 현재 연도와 1년 후까지
    (_, i) => currentYear + i
  );

  return (
    <>
      <DatePicker
        className={`w-28 text-center bg-transparent ${className}`}
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          onChange({ startDate: date, endDate });
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        disabled={!isEditable} // 수정 가능 여부에 따라 활성화
        minDate={new Date()} // 오늘부터 선택 가능
        placeholderText="시작일"
        dateFormat="yyyy-MM-dd"
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
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>

            {/* 연도 선택 드롭다운 */}
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
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
              {months.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      />
      ~
      <DatePicker
        className={`w-28 text-center bg-transparent ${className}`}
        selected={endDate}
        onChange={(date) => {
          setEndDate(date);
          onChange({ startDate, endDate: date });
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        disabled={!isEditable} // 수정 가능 여부에 따라 활성화
        minDate={startDate || new Date()} // startDate 이후 날짜부터 선택 가능
        placeholderText="종료일"
        dateFormat="yyyy-MM-dd"
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
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>

            {/* 연도 선택 드롭다운 */}
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
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
              {months.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      />
    </>
  );
};

export default DateRangePicker;
