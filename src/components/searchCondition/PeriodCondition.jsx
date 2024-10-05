import { useEffect, useState } from "react";
import circle from "../../assets/icons/write/circle.svg";

const PeriodCondition = ({ handleSelect }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [now, setNow] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedToday = `${year}-${month}-${day}`;
    setNow(formattedToday);
    setStartDate(formattedToday);
    setEndDate(formattedToday);
    handleSelect((prev) => ({
      ...prev,
      start: formattedToday,
      end: formattedToday,
    }));
  }, []);

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    handleSelect((prev) => ({
      ...prev,
      start: startDate,
      end: endDate,
    }));
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    handleSelect((prev) => ({
      ...prev,
      start: startDate,
      end: endDate,
    }));
  };

  return (
    <div className="flex justify-between items-center">
      {/* 년 / 월 셀렉트 */}
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">기간</div>
        <div>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="p-2 w-44 border rounded-s border-gray-300 mr-3"
            max={endDate}
          />
          ~
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="p-2 w-44 border rounded-s border-gray-300 ml-3 mr-3"
            max={now}
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodCondition;
