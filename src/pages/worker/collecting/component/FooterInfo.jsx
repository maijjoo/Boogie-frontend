import React, { useEffect, useState } from "react";

const FooterInfo = ({ pickedSpot }) => {
  const [selectedTrashAmount, setSelectedTrashAmount] = useState();
  useEffect(() => {
    if (pickedSpot && pickedSpot.length > 0) {
      const amount = pickedSpot.reduce(
        (total, spot) => total + spot.actualCollectedVolume,
        0
      );
      setSelectedTrashAmount(amount);
    }
  }, [pickedSpot]);

  return (
    <div className="w-full bg-blue-800 flex flex-col px-6 py-2">
      <h1 className="text-white font-bold text-lg">총 예상 수거량</h1>
      <div className="w-full flex items-center">
        <label className="w-1/2 text-white">50L 마대</label>
        <div className="w-1/2 flex gap-1">
          <label className="ps-10 pe-2 py-1 text-white border border-white rounded-md text-right">
            {Math.ceil(selectedTrashAmount / 50)}개
          </label>
          <label className="ps-8 pe-2 py-1 text-white border border-white rounded-md text-right">
            {selectedTrashAmount}L
          </label>
        </div>
      </div>
    </div>
  );
};

export default FooterInfo;
