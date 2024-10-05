import circle from "../../assets/icons/write/circle.svg";

const YearCondition = ({ handleSelect }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">연도</div>
      </div>
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
          <option value={Number(2023)}>2023</option>
          <option value={Number(2022)}>2022</option>
          <option value={Number(2021)}>2021</option>
          <option value={Number(2020)}>2020</option>
        </select>
      </div>
    </div>
  );
};

export default YearCondition;
