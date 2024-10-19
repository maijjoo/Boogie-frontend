import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      />
    </>
  );
};

export default DateRangePicker;
