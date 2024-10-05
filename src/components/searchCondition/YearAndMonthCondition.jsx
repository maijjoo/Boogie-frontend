import { useState } from "react";
import circle from "../../assets/icons/write/circle.svg";

const YearAndMonthCondition = ({ handleSelect }) => {
  return (
    <div className="flex justify-between items-center">
      {/* 년 / 월 셀렉트 */}
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">년 / 월</div>
        <div>
          <select
            className="p-2 w-30 border rounded-s border-gray-300 mr-3"
            onChange={(e) => {
              handleSelect((prev) => ({
                ...prev,
                year: e.target.value === "선택" ? null : e.target.value,
              }));
            }}
          >
            <option>선택</option>
            <option value={Number(2023)}>2023년</option>
            <option value={Number(2022)}>2022년</option>
            <option value={Number(2021)}>2021년</option>
            <option value={Number(2020)}>2020년</option>
          </select>
          <select
            className="p-2 w-30 border rounded-s border-gray-300"
            onChange={(e) => {
              handleSelect((prev) => ({
                ...prev,
                month: e.target.value === "선택" ? null : e.target.value,
              }));
            }}
          >
            <option>선택</option>
            <option value={Number(1)}>1월</option>
            <option value={Number(2)}>2월</option>
            <option value={Number(3)}>3월</option>
            <option value={Number(4)}>4월</option>
            <option value={Number(5)}>5월</option>
            <option value={Number(6)}>6월</option>
            <option value={Number(7)}>7월</option>
            <option value={Number(8)}>8월</option>
            <option value={Number(9)}>9월</option>
            <option value={Number(10)}>10월</option>
            <option value={Number(11)}>11월</option>
            <option value={Number(12)}>12월</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default YearAndMonthCondition;
