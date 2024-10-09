import React, { useEffect, useState } from "react";
import Copy from "../../../../assets/icons/write/Copy.svg";
import Cancel from "../../../../assets/icons/write/Cancel.svg";
import Circle from "../../../../assets/icons/write/Circle.svg";
import { getImageByFileName } from "../../../../api/collectApi";
import DefaultImgs from "../../../../assets/icons/write/Add Image.svg";
import Button from "../../../../components/commons/Button.jsx";
import AuthImage from "./AuthImage.jsx";

const DetailedSpot = ({
  spot,
  onClose,
  onAddSpot,
  onClearSpot,
  pickUpSpot,
  fetchAddress,
}) => {
  const [spotInfo, setSpotInfo] = useState({});
  const [address, setAddress] = useState();
  const [spotImgs, setSpotImgs] = useState([]);

  const getSpotInfoBySpotId = async () => {
    const selectedSpot = pickUpSpot.find((spotInfo) => spotInfo.id === spot);
    if (selectedSpot) {
      console.log("=============selectedSpot============: ", selectedSpot);

      setSpotInfo(selectedSpot);
      fetchAddress(setAddress, selectedSpot.latitude, selectedSpot.longitude);
    }
    console.log("=============address============= : ", address);
  };

  useEffect(() => {
    console.log("=============DetailedSpot========== : ", spotInfo);
    getSpotInfoBySpotId();
    if (spot && spot.latitude && spot.longitude) {
      fetchAddress(setAddress, spotInfo.latitude, spotInfo.longitude);
    }
    console.log("=============address============= : ", address);
  }, [spot, pickUpSpot, fetchAddress]);

  useEffect(() => {
    if (spotInfo && spotInfo.images && spotInfo.images.length > 0) {
      const fetchSpotImages = async () => {
        try {
          // 이미지 배열을 비동기로 처리하고 모든 작업이 끝나길 기다림
          const imgUrls = await Promise.all(
            spotInfo.images.map(async (img) => {
              return await getImageByFileName(img);
            })
          );
          // 이미지를 상태로 저장
          setSpotImgs([...imgUrls]);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
      fetchSpotImages();
    }
  }, [spotInfo]);

  return (
    <div className="w-full flex flex-col justify-center items-left p-3 border border-gray-500 bg-white rounded-t-xl pb-10">
      <div className="flex justify-between mb-3">
        <h1 className="inline font-bold text-red-500 text-xl">
          {spotInfo.pickUpPlace}
        </h1>
        <img
          className="inline cursor-pointer w-6"
          src={Cancel}
          onClick={() => onClose(false)}
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="inline w-full border border-gray-500 rounded-md my-1 px-2 py-1 text-md">
          {address ? address : "주소를 불러오는 중..."}
        </label>
        <img
          className="inline cursor-pointer w-8"
          src={Copy}
          onClick={() => {
            // 클립보드 복사 라이브러리
          }}
        />
      </div>
      <div className="w-full overflow-x-auto mt-2">
        <div className="flex p-2 gap-3">
          {spotImgs && spotImgs.length > 0 ? (
            spotImgs.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 h-28 flex items-center justify-center border border-dashed border-gray-300 rounded-md"
              >
                <img src={img} alt="spotImages" className="w-full h-full" />
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <img src={DefaultImgs} alt="no Image" className="w-full h-full" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex mt-2 justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">주요 쓰레기 종류</label>
        </div>
        <label className="inline border border-gray-400 rounded-md w-1/2 px-2 py-1 ">
          {spotInfo.mainTrashType}
        </label>
      </div>
      <div className="flex w-full items-center mt-4 gap-3">
        <div className="flex w-1/2 items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">실제 쓰레기양</label>
        </div>
        <div className="flex w-2/3 gap-2">
          <label className="w-1/2 text-right border border-gray-400 rounded-md px-2 py-1">
            {spotInfo.realTrashAmount} 개
          </label>
          <label className="w-1/2 text-right border border-gray-400 rounded-md px-2 py-1">
            {spotInfo.realTrashAmount * 50} L
          </label>
        </div>
      </div>
      <div className="w-full flex gap-5 mt-3">
        <Button
          color="white"
          className="w-1/2 rounded-md px-3 py-2 text-md"
          onClick={() => {
            onAddSpot(spotInfo.id);
            onClose(false);
          }}
        >
          경로 추가
        </Button>
        <Button
          color="blue"
          className="w-1/2 rounded-lg px-3 py-2 text-md"
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
