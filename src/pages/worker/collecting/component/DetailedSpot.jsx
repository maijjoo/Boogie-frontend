import React, { useEffect, useState } from "react";
import Copy from "../../../../assets/icons/write/Copy.svg";
import Cancel from "../../../../assets/icons/write/Cancel.svg";
import Circle from "../../../../assets/icons/write/Circle.svg";
import CardImages from "../../../../assets/images/CardImages.jpg";
import { pickUpSpot } from "../../../../datas/pickUpSpot";
import Button from "../../../../components/commons/Button.jsx";

const DetailedSpot = ({ spot, onClose, onAddSpot, onClearSpot }) => {
  const [spotInfo, setSpotInfo] = useState({});

  const getSpotInfoBySpotId = () => {
    pickUpSpot.map((spotInfo) => {
      if (spotInfo.title === spot) {
        setSpotInfo(spotInfo);
        console.log(spotInfo);
      }
    });
  };

  useEffect(() => {
    getSpotInfoBySpotId();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-left px-10 pt-10">
      <div className="flex justify-between mb-3">
        <h1 className="inline font-extrabold text-red-500 text-2xl">
          {spotInfo.title}
        </h1>
        <img
          className="inline cursor-pointer w-6"
          src={Cancel}
          onClick={() => onClose(false)}
          alt="cancel button"
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="inline w-full border border-gray-500 rounded-md px-3 py-2 text-md">
          {spotInfo.address}
        </label>
        <img
          className="inline cursor-pointer"
          src={Copy}
          onClick={() => {}}
          alt="copy button"
        />
      </div>
      <div className="rounded-md w-full overflow-x-auto mt-2">
        <div className="flex">
          {/* {sources.map((source, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 h-24 mr-2 cursor-pointer"
              onClick={() => {
                if (confirm("사진을 삭제하시겠습니까?")) {
                  setSources(
                    (prevSources) => prevSources.filter((_, i) => i !== index) // 현재 인덱스를 제외한 새로운 배열 생성
                  );
                }
              }}
            >
              <img
                src={source}
                alt={`snap-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))} */}
          <div className="flex-shrink-0 w-40 h-40 mr-2 cursor-pointer">
            <img
              src={CardImages}
              alt={`snap-${1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-shrink-0 w-40 h-40 mr-2 cursor-pointer">
            <img
              src={CardImages}
              alt={`snap-${1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-shrink-0 w-40 h-40 mr-2 cursor-pointer">
            <img
              src={CardImages}
              alt={`snap-${1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex mt-2 items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">주요 쓰레기 종류</label>
        </div>
        <div className="flex w-full mt-2">
          <label className="border border-gray-400 rounded-md w-full px-3 py-2">
            {spotInfo.mainTrashType}
          </label>
        </div>
      </div>
      <div className="flex w-full items-center mt-4">
        <div className="flex w-1/2 items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">실제 쓰레기양</label>
        </div>
        <div className="flex w-1/2">
          <label className="w-full text-right border border-gray-400 rounded-md px-3 py-2">
            {spotInfo.realTrashAmount}
          </label>
        </div>
      </div>
      <div className="w-full flex gap-2 mt-4">
        <Button
          color="white"
          className="w-1/2 rounded-md px-3 py-2 text-lg"
          onClick={() => {
            onAddSpot(spotInfo.title);
            onClose(false);
          }}
        >
          경로 추가
        </Button>
        <Button
          color="blue"
          className="w-1/2 rounded-lg px-4 py-3 text-lg"
          onClick={() => {
            onClearSpot(spotInfo.title);
            onClose(false);
          }}
        >
          수거 완료
        </Button>
      </div>
    </div>
  );
};

export default DetailedSpot;
