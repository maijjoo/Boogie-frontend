import React, { useState } from "react";
import CheckBoxWithLabel from "./CheckboxWithLabel";
import dot from "../../assets/icons/write/Circle.svg";
import { MainTrashList } from "../../datas/MainTrashList.js";

const FormSub = ({ beachName, subs }) => {
  const [selected, setSelected] = useState(false);

  const handleCheckboxChange = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <>
      <h1 className="mt-3 mb-1 w-full text-left font-bold">{`${beachName}${
        subs.length + 1
      }`}</h1>
      <div className="w-full border border-gray-600 rounded-md p-3">
        <div className="w-full flex justify-between mb-2">
          <label className="inline">
            <img src={dot} alt="dot" className="w-1 me-2 inline" />
            쓰레기 예측량(L)
          </label>
          <input
            type="number"
            className="p-1 text-right border border-black rounded-md"
          />
        </div>
        <div className="w-full flex flex-col justify-start">
          <label className="inline">
            <img src={dot} alt="dot" className="w-1 me-2 inline" />
            주요 쓰레기 종류(택 1)
          </label>
        </div>
        <ul className="items-center">
          {MainTrashList.map((trash, index) => (
            <li key={index} className="text-start">
              <CheckBoxWithLabel
                checked={selected === index}
                onChange={() => handleCheckboxChange(index)}
              >
                {trash.type}
                <p className="inline text-sm">{trash.description}</p>
              </CheckBoxWithLabel>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FormSub;
