import { useState } from "react";
import CheckBoxWithLabel from "./CheckboxWithLabel";
import Button from "./Button.jsx";
import dot from "../../assets/icons/write/Circle.svg";
import { MainTrashList } from "../../datas/MainTrashList.js";
import useCurrentPosition from "../../hooks/useCurrentPosition.js";

const FormSub = ({
  beachName,
  subIdx,
  setSubs = null,
  setAmount,
  startcoord,
  isCollapsed,
  _trashAmount,
  mainTrashIndex,
  onComplete,
  deleteSub = null,
  setCollapse = null,
}) => {
  const { fetchLocation } = useCurrentPosition();

  const [selectedTrash, setSelectedTrash] = useState(null);

  const [trashAmount, setTrashAmount] = useState(0);

  const isComplete = selectedTrash !== null && trashAmount > 0;

  const subindex = subIdx !== 0 ? Number(subIdx) + 1 : 1;

  const handleTrashChange = (index) => {
    setSelectedTrash(selectedTrash === index ? null : index);
  };

  const handleComplete = async () => {
    // try {
    //   const position = await new Promise((resolve, reject) => {
    //     navigator.geolocation.getCurrentPosition(resolve, reject);
    //   });

    const locData = await fetchLocation();

    let receivedCoords = [];

    if (locData.coords) {
      // console.log("좌표 가져오기 성공: ", locData.coords);
      receivedCoords = locData.coords;
    } else if (locData.error) {
      // console.log("좌표 가져오기 오류: ", locData.error);
      return;
    }

    const subData = {
      startLatitude: startcoord[0],
      startLongitude: startcoord[1],
      endLatitude: receivedCoords[0],
      endLongitude: receivedCoords[1],
      beachNameWithIndex: `${beachName}${subindex}`,
      mainTrashType: MainTrashList[selectedTrash].type,
    };

    setAmount((prevAmount) => prevAmount + Number(trashAmount));

    setSubs((prevSubs) => [
      ...prevSubs,
      { data: subData, isCollapsed: true, trashAmount: trashAmount },
    ]);
    onComplete?.();
    // } catch (error) {
    //   console.error("위치 정보 획득 실패:", error);
    //   alert("위치 정보를 가져오는데 실패했습니다. GPS 설정을 확인해주세요.");
    // }
  };

  if (isCollapsed) {
    return (
      <div className="w-full border border-gray-400 rounded-md p-3 mb-3 bg-white">
        <div className="flex justify-between">
          <h1 className="w-full text-left font-bold">{`${beachName}${subindex}`}</h1>
          <div
            className="w-full xl:w-1/3 flex justify-end cursor-pointer"
            onClick={() => setCollapse()}
          >
            <p>{isCollapsed ? "펴기▼" : "접기▲"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full border border-gray-400 rounded-md p-3 mb-3 bg-white ">
        <div className="flex justify-between">
          <h1 className="w-full text-left font-bold">{`${beachName}${subindex}`}</h1>
          {isCollapsed !== undefined && (
            <div
              className="w-full xl:w-1/3 flex justify-end cursor-pointer"
              onClick={() => setCollapse()}
            >
              <p>{isCollapsed ? "펴기▼" : "접기▲"}</p>
            </div>
          )}
        </div>

        <div className="w-full flex justify-between my-2 pt-2 items-center ">
          <label className="font-semibold inline w-1/2">
            <img src={dot} alt="dot" className="w-1 me-2 inline" />
            쓰레기 예측량(L)
          </label>
          {isCollapsed === undefined ? (
            <input
              type="number"
              value={trashAmount === 0 ? "" : trashAmount}
              onChange={(e) => setTrashAmount(e.target.value)}
              className="p-1 text-right border border-black rounded-md w-1/2"
            />
          ) : (
            <label className="w-1/4 p-1 text-right border border-black rounded-md">
              {_trashAmount}
            </label>
          )}
        </div>
        <div className="w-full flex flex-col justify-start">
          <label className="inline font-semibold">
            <img src={dot} alt="dot" className="w-1 me-2 inline" />
            주요 쓰레기 종류(택 1)
          </label>
        </div>
        {isCollapsed === undefined ? (
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
        ) : (
          <div className="flex items-center mt-3">
            <label className="font-bold">
              {MainTrashList[mainTrashIndex].type}
            </label>
            <p className="inline text-sm">
              {MainTrashList[mainTrashIndex].description}
            </p>
          </div>
        )}

        <div className="w-full mt-3">
          <Button
            className="w-full py-3 rounded-lg"
            color={
              isCollapsed !== undefined ? "blue" : isComplete ? "blue" : "gray"
            }
            disabled={isCollapsed !== undefined ? false : !isComplete}
            onClick={
              deleteSub === null
                ? handleComplete
                : () => {
                    if (confirm("삭제하시겠습니다?")) {
                      deleteSub();
                    }
                  }
            }
          >
            {deleteSub === null ? "조사 완료" : "삭제"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormSub;
