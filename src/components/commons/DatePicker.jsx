import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(null); // 기본값 null

  // 오늘 날짜
  const today = new Date();

  return (
    <DatePicker
      className="w-56 border-b border-b-gray-300 text-right "
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      minDate={today} // 오늘부터 선택 가능
      dateFormat="yyyy-MM-dd" // 입력 필드에 표시될 날짜 형식
    />
  );
};

export default DatePickerComponent;
