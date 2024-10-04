import circle from "../../assets/icons/write/circle.svg";

const YearCondition = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">연도</div>
      </div>
      <div>
        <select
          className="p-2 w-44 border rounded-s border-gray-300 mr-3
          "
        >
          <option>선택</option>
          <option>2023</option>
          <option>2022</option>
          {/* <option>남구</option> */}
          <option>2021</option>
          <option>2020</option>
        </select>
      </div>
    </div>
  );
};

export default YearCondition;
