import React, { useEffect, useState } from "react";
import CheckBoxWithLabel from "./CheckboxWithLabel.jsx";
import { MainTrashList } from "../../datas/MainTrashList.js";

const CleaningFormSub = ({ beachName, setSubs, isComplete }) => {
  const [selectedTrash, setSelectedTrash] = useState(null);
  const [realTrashAmount, setRealTrashAmount] = useState("");
  const [isSubFormComplete, setIsSubFormComplete] = useState(false);

  useEffect(() => {
    const complete = selectedTrash !== null && realTrashAmount > 0;
    setIsSubFormComplete(complete);
    isComplete(complete); // 상위 컴포넌트로 상태 전달
  }, [selectedTrash, realTrashAmount]);

  const handleTrashChange = (index) => {
    setSelectedTrash(selectedTrash === index ? null : index);
  };

  return (
    <div className="w-full border border-gray-600 rounded-md p-3">
      <div className="flex justify-between"></div>
      <div className="flex items-center justify-between">
        <label className="me-2 w-full">50L 마대</label>
        <input
          type="number"
          onInput={(e) => setRealTrashAmount(e.target.value)}
          value={realTrashAmount === 0 ? "" : realTrashAmount}
          className="border border-stone-300 rounded-md p-1 w-1/2 me-1 no-spinner"
        />{" "}
        개
      </div>

      <div className="w-full flex flex-col justify-start">
        <label className="inline">주요 쓰레기 종류(택 1)</label>
      </div>
      <ul className="items-center">
        {MainTrashList.map((trash, index) => (
          <li key={index} className="text-start">
            <CheckBoxWithLabel
              checked={selectedTrash === index}
              onChange={() => handleTrashChange(index)}
            >
              {trash.type}
            </CheckBoxWithLabel>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CleaningFormSub;
