import React, { useEffect, useState } from "react";
import up from "../../../../assets/icons/write/Sort Up.svg";
import down from "../../../../assets/icons/write/Sort Down.svg";
import tab from "../../../../assets/icons/write/opened.png";
import { ChevronUp, ChevronDown } from "lucide-react";
import MobileFooter from "../../../../components/menus/MobileFooter";
import PickedSpot from "./PickedSpot";

const FooterInfo = ({ pickedSpot, onList, setOnList }) => {
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

  // return (
  //   <div className="w-full flex flex-col">
  //     <div
  //       className="w-full border-t-2 rounded-t-xl h-1 bg-white flex justify-center items-center py-3 border-gray-300 cursor-pointer"
  //       onClick={() => (onList ? setOnList(false) : setOnList(true))}
  //     >
  //       <img className="h-12 w-12" src={tab} />
  //     </div>
  //     <div className="bg-blue-800 px-6 py-2">
  //       <div className="flex justify-between">
  //         <h1 className="text-white font-bold text-lg">총 예상 수거량</h1>
  //       </div>
  //       <div className="w-full flex items-center">
  //         <label className="w-1/2 text-white">50L 마대</label>
  //         <div className="w-1/2 flex gap-1">
  //           <label
  //             className="px-2 py-1 text-white border border-white rounded-md text-right"
  //             style={{ minWidth: "80px" }}
  //           >
  //             {Math.ceil(selectedTrashAmount)}개
  //           </label>
  //           <label
  //             className="px-2 py-1 text-white border border-white rounded-md text-right"
  //             style={{ minWidth: "80px" }}
  //           >
  //             {Math.ceil(selectedTrashAmount) * 50}L
  //           </label>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <>
      {/* 반투명 오버레이 - 리스트가 열렸을 때만 표시  */}
      {onList && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOnList(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* 슬라이딩 패널 */}
        <div
          className={`bg-white transition-transform duration-500 ease-out ${
            onList ? "h-[calc(100vh-56px)]" : "h-auto"
          }`}
          style={{
            transform: onList
              ? "translateY(0)"
              : `translateY(calc(100% - 144px))`,
          }}
        >
          {/* 핸들 바 */}
          <div
            className="w-full h-1 bg-white flex justify-center items-center py-3 border-t-2 border-gray-300 rounded-t-xl cursor-pointer"
            onClick={() => setOnList(!onList)}
          >
            {onList ? (
              <ChevronDown className="h-12 w-12 text-gray-600" />
            ) : (
              <ChevronUp className="h-12 w-12 text-gray-600" />
            )}
          </div>

          {/* 리스트 영역 */}
          {onList && (
            <div className="h-[calc(100%-200px)] overflow-y-auto bg-gray-50 p-4">
              {pickedSpot.map((spot, index) => (
                // <Card key={spot.id} className="mb-4">
                //   <CardContent className="p-4">
                //     <h3 className="font-bold text-lg mb-2">
                //       수거지 {index + 1}
                //     </h3>
                //     <p>주소: {spot.address}</p>
                //     <p>예상 수거량: {spot.actualCollectedVolume}L</p>
                //   </CardContent>
                // </Card>
                // 여기 PickedSpot 컴포넌트 쓰면됨
                <div key={index}></div>
              ))}
            </div>
          )}

          {/* 요약 정보 카드 - 항상 표시 */}
          <div className="bg-blue-800 px-6 py-2 fixed bottom-16 left-0 right-0 z-40">
            <div className="flex justify-between">
              <h1 className="text-white font-bold text-lg">총 예상 수거량</h1>
            </div>
            <div className="w-full flex items-center">
              <label className="w-1/2 text-white">50L 마대</label>
              <div className="w-1/2 flex gap-1">
                <label
                  className="px-2 py-1 text-white border border-white rounded-md text-right"
                  style={{ minWidth: "80px" }}
                >
                  {Math.ceil(selectedTrashAmount)}개
                </label>
                <label
                  className="px-2 py-1 text-white border border-white rounded-md text-right"
                  style={{ minWidth: "80px" }}
                >
                  {Math.ceil(selectedTrashAmount) * 50}L
                </label>
              </div>
            </div>
          </div>
        </div>

        <MobileFooter homeroot="/collectingMain" />
      </div>
    </>
  );
};

export default FooterInfo;
