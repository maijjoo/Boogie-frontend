import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import MobileFooter from "../../../../components/menus/MobileFooter";
import PickedSpot from "./PickedSpot";

const FooterInfo = ({
  onList,
  setOnList,
  fetchAddress,
  onDrop,
  onClearSpot,
  addedSpots,
  onUpdateSpot,
}) => {
  const [selectedTrashAmount, setSelectedTrashAmount] = useState(0);

  useEffect(() => {
    if (addedSpots && addedSpots.length > 0) {
      const amount = addedSpots.reduce(
        (total, spot) => total + spot.realTrashAmount,
        0
      );
      setSelectedTrashAmount(amount);
    } else setSelectedTrashAmount(0);
  }, [addedSpots]);

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
          className={` transition-transform duration-500 ease-out ${
            onList ? "h-[calc(100vh-56px)]" : "h-auto"
          }`}
          style={{
            transform: onList
              ? "translateY(0)"
              : `translateY(calc(100% - 103px))`,
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
            <div className="bg-white h-[calc(100%-103px)] overflow-y-auto p-4">
              {addedSpots.map((spot, index) => (
                // 여기 PickedSpot 컴포넌트 쓰면됨
                <div key={index}>
                  <PickedSpot
                    spot={spot}
                    index={index}
                    fetchAddress={fetchAddress}
                    onDrop={onDrop}
                    onClearSpot={onClearSpot}
                    onUpdateSpot={onUpdateSpot}
                  />
                </div>
              ))}
            </div>
          )}

          {/* 요약 정보 카드 - 항상 표시 */}
          <div className="bg-blue-800 px-6 py-2 z-40">
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
