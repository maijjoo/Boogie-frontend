import React, { useState } from "react";
import CheckBoxWithLabel from "./CheckboxWithLabel";
import Button from "./Button.jsx";
import dot from "../../assets/icons/write/Circle.svg";
import { MainTrashList } from "../../datas/MainTrashList.js";
import { MatchUsername } from "../../datas/MatchUsername.js";

const FormSub = ({
  beachName,
  subIdx,
  setSubs,
  setAmount,
  startcoord,
  isCollapsed = undefined,
  data = null,
  onComplete,
}) => {
  const [selectedTrash, setSelectedTrash] = useState(
    data?.mainTrashType
      ? MainTrashList.findIndex((item) => item.type === data.mainTrashType)
      : null
  );

  const [trashAmount, setTrashAmount] = useState(data?.trashAmount || 0);

  const [isLocalCollapsed, setIsLocalCollapsed] = useState(undefined);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isComplete = selectedTrash !== null && trashAmount > 0;

  const handleTrashChange = (index) => {
    setSelectedTrash(selectedTrash === index ? null : index);
  };

  const handleComplete = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const subData = {
        startLatitude: startcoord[0],
        startLongitude: startcoord[1],
        endLatitude: position.coords.latitude,
        endLongitude: position.coords.longitude,
        beachNameWithIndex: `${beachName}${subindex}`,
        mainTrashType: MainTrashList[selectedTrash].type,
      };

      setAmount((prevAmount) => prevAmount + Number(trashAmount));

      setSubs((prevSubs) => [...prevSubs, subData]);
      onComplete?.();
    } catch (error) {
      console.error("위치 정보 획득 실패:", error);
      alert("위치 정보를 가져오는데 실패했습니다. GPS 설정을 확인해주세요.");
    }
  };

  // const onSubFormSubmit = () => {
  //   let endlat;
  //   let endlon;

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       endlat = position.coords.latitude;
  //       endlon = position.coords.longitude;
  //     },
  //     (error) => {
  //       alert(error);
  //     }
  //   );

  //   const sub = {
  //     startLatitude: startcoord[0], // 시작위도
  //     startLongitude: startcoord[1], // 시작경도
  //     endLatitude: endlat, //끝위도
  //     endLongitude: endlon, //끝경도
  //     beachNameWithIndex: beachName + subindex, //해운대1, 해운대2 등
  //     mainTrashType: MainTrashList[selectedTrash].type, //주요 쓰레기 종류
  //     trashAmount: trashAmount,
  //   };

  //   setSubs((prevSubs) => [...prevSubs, sub]);

  //   setIsSubmitted(true);
  //   setIsFlipped(true);
  //   setSubWrite(false);

  //   console.log(sub);
  // };

  const isReady = selectedTrash !== null && trashAmount > 0;
  const subindex = subIdx !== 0 ? Number(subIdx) + 1 : 0;

  if (isCollapsed || isLocalCollapsed) {
    return (
      <div className="w-full border border-gray-600 rounded-md p-3 mb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{`${beachName}${subIdx}`}</h3>
          <button
            onClick={() => setIsLocalCollapsed(false)}
            className="text-blue-600"
          >
            펼치기▼
          </button>
        </div>
        <p className="text-sm text-gray-600">
          쓰레기 예측량: {trashAmount}L
          <br />
          주요 쓰레기: {MainTrashList[selectedTrash]?.type}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full border border-gray-600 rounded-md p-3">
        <div className="flex justify-between">
          <h1 className="w-full text-left font-bold">{`${beachName}${subindex}`}</h1>
          {isLocalCollapsed !== undefined && (
            <div
              className="w-full xl:w-1/3 flex justify-end cursor-pointer"
              onClick={() => {
                setIsLocalCollapsed((prev) => !prev);
              }}
            >
              <p>
                {isLocalCollapsed !== undefined
                  ? isLocalCollapsed
                    ? "펴기▼"
                    : "접기▲"
                  : null}
              </p>
            </div>
          )}
        </div>

        {!isLocalCollapsed && (
          <>
            <div className="w-full flex justify-between my-2 pt-2">
              <label className="inline">
                <img src={dot} alt="dot" className="w-1 me-2 inline" />
                쓰레기 예측량(L)
              </label>
              <input
                type="number"
                value={trashAmount}
                onChange={(e) => setTrashAmount(e.target.value)}
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
                    checked={selectedTrash === index}
                    onChange={() => handleTrashChange(index)}
                  >
                    {trash.type}
                    <p className="inline text-sm">{trash.description}</p>
                  </CheckBoxWithLabel>
                </li>
              ))}
            </ul>
            <div className="w-full mt-3">
              <Button
                className="w-full py-4 rounded-lg"
                color={isComplete ? "blue" : "gray"}
                disabled={!isComplete}
                onClick={handleComplete}
              >
                조사 완료
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FormSub;
