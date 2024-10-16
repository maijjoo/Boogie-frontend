import React, { useEffect, useState } from "react";
import Copy from "../../../../assets/icons/write/Copy.svg";
import Cancel from "../../../../assets/icons/write/Cancel.svg";
import Circle from "../../../../assets/icons/write/Circle.svg";
import { getImageByFileName } from "../../../../api/collectApi";
import DefaultImgs from "../../../../assets/icons/write/Add Image.svg";
import Button from "../../../../components/commons/Button.jsx";
import AuthImage from "./AuthImage.jsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DetailedSpot = ({
  spot,
  onClose,
  onAddSpot,
  onClearSpot,
  fetchAddress,
  neededSpots,
  addedSpots,
  onUpdateSpot,
}) => {
  const [spotInfo, setSpotInfo] = useState({});
  const [address, setAddress] = useState("");
  const [spotImgs, setSpotImgs] = useState([]);
  const [spotHDImgs, setSpotHDImgs] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getSpotInfoBySpotId = async () => {
    const selectedSpot1 = neededSpots.find((spotInfo) => spotInfo.id === spot);
    if (selectedSpot1) {
      console.log("=============selectedSpot============: ", selectedSpot1);

      setSpotInfo(selectedSpot1);
      await fetchAddress(
        setAddress,
        selectedSpot1.latitude,
        selectedSpot1.longitude
      );
    }
    const selectedSpot2 = addedSpots.find((spotInfo) => spotInfo.id === spot);
    if (selectedSpot2) {
      console.log("=============selectedSpot============: ", selectedSpot2);

      setSpotInfo(selectedSpot2);
      setIsAdded(true);
      await fetchAddress(
        setAddress,
        selectedSpot2.latitude,
        selectedSpot2.longitude
      );
    }
    console.log("=============address============= : ", address);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgs.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    console.log("=============DetailedSpot========== : ", spotInfo);
    getSpotInfoBySpotId();
    if (spot && spot.latitude && spot.longitude) {
      fetchAddress(setAddress, spotInfo.latitude, spotInfo.longitude);
    }
    console.log("=============address============= : ", address);
  }, [spot]);

  useEffect(() => {
    if (spotInfo && spotInfo.images && spotInfo.images.length > 0) {
      const fetchSpotImages = async () => {
        try {
          // 이미지 배열을 비동기로 처리하고 모든 작업이 끝나길 기다림
          await Promise.all(
            spotInfo.images.map(async (img) => {
              if (!imgs.includes(img)) {
                setImgs((prev) => [...prev, img]);
                const image = await getImageByFileName(img);
                const hdImage = await getImageByFileName(
                  img.replace(/^S_/, "")
                );
                setSpotImgs((prev) => [...prev, image]);
                setSpotHDImgs((prev) => [...prev, hdImage]);
              }
            })
          );
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
      fetchSpotImages();
    }
  }, [spotInfo]);

  return (
    <div className="w-full flex flex-col justify-center items-left p-3 border border-gray-500 bg-white rounded-t-xl pb-10">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 rounded-t-xl">
          <div className="relative bg-white rounded-sm p-1">
            <div className="relative">
              <img
                src={spotHDImgs[currentImageIndex]}
                alt="큰 해안가 사진"
                className="max-w-full max-h-screen object-contain"
              />
              {/* X 버튼을 이미지 위에 배치 */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 w-7 h-7 bg-gray-800 bg-opacity-60 text-white rounded-full hover:bg-opacity-80"
              >
                X
              </button>
              <button
                onClick={goToPreviousImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
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
          {address ? address : "정확한 주소를 불러올 수 없습니다"}
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
                onClick={() => {
                  openModal();
                  setCurrentImageIndex(index);
                }}
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
          className="w-1/2 rounded-md px-3 py-2 text-base"
          onClick={() => {
            if (
              confirm(
                spotInfo.pickUpPlace + "을(를) 수거 경로에 추가하시겠습니까?"
              )
            ) {
              onUpdateSpot(spotInfo.id, "toAdded");
              onClose(false);
            }
          }}
          disabled={isAdded}
        >
          경로 추가
        </Button>
        <Button
          color="blue"
          className="w-1/2 rounded-lg px-3 py-2 text-base"
          onClick={() => {
            onUpdateSpot(spotInfo.id, "toCompleted");
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
