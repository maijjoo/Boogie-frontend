import circle from "../../assets/icons/write/circle.svg";

const BeachCondition = () => {
  return (
    <div className="flex items-center space-x-2 ml-auto">
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">해안명</div>
      </div>
      <div>
        <select
          className="p-2 w-44 border rounded-s border-gray-300 mr-3
        "
        >
          <option>전체</option>
          <option>강서구</option>
          <option>기장군</option>
          {/* <option>남구</option> */}
          <option>사하구</option>
          <option>수영구</option>
          <option>영도구</option>
          <option>해운 대해수욕장구</option>
        </select>
        <select className="p-2 w-44 border rounded-s border-gray-300 ">
          <option>전체</option>
        </select>
      </div>
    </div>
  );
};

export default BeachCondition;
