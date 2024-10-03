import React, { useEffect, useState } from "react";
import Copy from "../../../../assets/icons/write/Copy.svg";
import Cancel from "../../../../assets/icons/write/Cancel.svg";
import { pickUpSpot } from "../../../../datas/pickUpSpot";

const DetailedSpot = ({ spot, onClose }) => {
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
    <div className="flex flex-col justify-center items-left p-3">
      <div className="flex justify-between mb-3">
        <h1 className="inline font-bold text-red-500 text-xl">
          {spotInfo.title}
        </h1>
        <img
          className="inline cursor-pointer w-6"
          src={Cancel}
          onClick={() => onClose(false)}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="inline border border-gray-500 rounded-md p-1 text-sm">
          {spotInfo.address}
        </label>
        <img className="inline cursor-pointer" src={Copy} onClick={() => {}} />
      </div>
    </div>
  );
};

export default DetailedSpot;
