import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel";
import Button from "../../../components/commons/Button.jsx";
import PickUpCameraController from "../../../components/commons/PickUpCameraController.jsx";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import { MainTrashList } from "../../../datas/MainTrashList.js";
import { postAdd } from "../../../api/pickUpApi.js";
import "../../../App.css";
import { useAuth } from "../../../hooks/useAuth.js";
import dot from "../../../assets/icons/write/Circle.svg";
import CameraController from "../../../components/commons/CameraController.jsx";

const PickUpPlaceMainPage = () => {
  const navigate = useNavigate();
  const { username, isLoggedIn } = useAuth();

  // State 관리
  const [pickUpPlace, setPickUpPlace] = useState(""); // 집하지 위치
  const [actualCollectedVolume, setActualCollectedVolume] = useState(""); // 50L 마대 수량
  const [mainTrashType, setMainTrashType] = useState(""); // 주요 쓰레기 타입
  const [photos, setPhotos] = useState([]); // 사진 리스트
  const [startCoords, setStartCoords] = useState(); // 좌표 정보
  const [result, setResult] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // 등록하기 버튼 상태 관리

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (result === "success") {
      alert("등록 완료");
      navigate("/cleaningSelect", { replace: true });
    }
  }, [isLoggedIn, result, navigate]);

  // Handle Photo Upload
  const handlePhotoUpload = (newPhotos) => {
    if (photos.length + newPhotos.length > 3) {
      alert("사진은 최대 3장까지 등록할 수 있습니다.");
      return;
    }
  };

  // 총 쓰레기양 계산
  const calculateTotalWasteVolume = () => {
    return actualCollectedVolume * 50;
  };

  // 마대 갯수 => 쓰레기 양
  const replaceCountToL = () => {
    return actualCollectedVolume * 50;
  };

  // input태그에서 빈 값이거나 0보다 큰 숫자만 상태에 반영

  const handleInput = (e) => {
    const value = e.target.value;
    //
    if (value === "" || Number(value) > 0) {
      setActualCollectedVolume(value);
    }
  };

  // Handle Trash Type Change
  const handleTrashTypeChange = (type) => {
    setMainTrashType(type);
  };

  // Form Submission Handler
  const handleFormSubmit = () => {
    if (
      !pickUpPlace ||
      !mainTrashType ||
      calculateTotalWasteVolume() === 0 ||
      (photos.length < 1 && photos.length > 4)
    ) {
      alert("모든 필드를 올바르게 입력해 주세요.");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setStartCoords([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
        }
      );

      const pickUpRequestDto = {
        pickUpPlace: pickUpPlace,
        actualCollectedVolume: calculateTotalWasteVolume(),
        mainTrashType: mainTrashType,
        latitude: startCoords[0],
        longitude: startCoords[1],
        submitterUsername: username,
      };
      const files = photos;
      const formData = new FormData();

      if (files !== null && files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      formData.append("submitterUsername", pickUpRequestDto.submitterUsername);
      formData.append("pickUpPlace", pickUpRequestDto.pickUpPlace);
      formData.append(
        "actualCollectedVolume",
        pickUpRequestDto.actualCollectedVolume
      );
      formData.append("mainTrashType", pickUpRequestDto.mainTrashType);
      formData.append("latitude", pickUpRequestDto.latitude);
      formData.append("longitude", pickUpRequestDto.longitude);

      postAdd(formData).then((data) => {
        setResult(data.result);
        console.log("-----------data.result");
        console.log(data.result);
      });
    }
  };

  useEffect(() => {
    if (
      pickUpPlace.trim() !== "" &&
      mainTrashType.trim() !== "" &&
      actualCollectedVolume > 0 &&
      photos.length > 0 &&
      photos.length <= 3
    ) {
      setIsSubmitDisabled(false); // 모든 조건을 만족하면 버튼 활성화
    } else {
      setIsSubmitDisabled(true); // 조건을 만족하지 않으면 비활성화
    }
  }, [pickUpPlace, mainTrashType, actualCollectedVolume, photos]);

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      {/* 헤더 */}
      <MobileHeader className="fixed top-0 z-50">집하지 등록</MobileHeader>

      <div className="w-full px-5 p-3 mt-12 mb-24 bg-gray-50">
        <div className="w-full xl:w-1/3  border border-stone-400 rounded-md mb-2 p-4 bg-white">
          {/* 집하지 위치 입력 */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex flex-col gap-1">
              <label className="w-full font-semibold">
                <img src={dot} alt="dot" className="w-1 me-2 inline" />
                집하지
              </label>
              <input
                type="text"
                className="block p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 w-full"
                value={pickUpPlace}
                onChange={(e) => setPickUpPlace(e.target.value)}
              />

              <span className="block text-xs text-gray-500">
                (예시) 해운대 경찰서 앞
              </span>
            </div>

            {/* 사진 첨부 */}

            <CameraController
              setSource={setPhotos}
              title="집하지 사진"
              max="3"
              min="1"
            />

            {/* 실제 쓰레기양 입력 */}
            <div className="w-full flex flex-col justify-start mb-4 mt-2">
              <label className="block font-semibold mb-2">
                <img src={dot} alt="dot" className="w-1 me-2 inline" />
                실제 쓰레기양
              </label>
              <div className="w-full flex items-center justify-between">
                <label className="me-2 w-1/2">50L 마대</label>
                <input
                  type="number"
                  onInput={(e) => handleInput(e)}
                  value={
                    actualCollectedVolume === 0 ? "" : actualCollectedVolume
                  }
                  onChange={(e) =>
                    setActualCollectedVolume(Number(e.target.value))
                  }
                  className="border border-stone-300 rounded-md p-1 w-1/2 me-1 no-spinner"
                />{" "}
                개
                <input
                  type="number"
                  className="border border-stone-300 rounded-md p-1 w-1/2 me-1 ms-3 no-spinner"
                  value={replaceCountToL()}
                  readOnly
                />
                L
              </div>
            </div>

            {/* 주요 쓰레기 종류 선택 */}
            <div className="w-full mt-4 mb-2">
              <label className="block font-semibold">
                <img src={dot} alt="dot" className="w-1 me-2 inline" />
                주요 쓰레기 종류 (택 1)
              </label>
              <div className="flex flex-col">
                {MainTrashList.map((trash, index) => (
                  <CheckBoxWithLabel
                    key={index}
                    checked={mainTrashType === trash.type}
                    onChange={() => handleTrashTypeChange(trash.type)}
                  >
                    {trash.type}{" "}
                    <span className="text-sm">{trash.description}</span>
                  </CheckBoxWithLabel>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="w-full xl:w-1/3 mt-3 flex flex-col justify-center">
        <div className="border-t-2 fixed bottom-0 z-50 bg-white w-full flex flex-col justify-center gap-2">
          <div className="flex mt-2 px-2 gap-2">
            <div className="w-1/2 inline-block">
              <Button
                className="w-full py-3 rounded-lg"
                color="blue"
                onClick={() => alert("임시 저장되었습니다.")}
              >
                임시저장
              </Button>
            </div>
            <div className="w-1/2 inline-block">
              <Button
                className={`w-full py-3 rounded-lg ${
                  isSubmitDisabled
                    ? "bg-gray-300 cursor-default hover:bg-gray-300"
                    : "bg-blue-700 text-white hover:bg-blue-900"
                }`}
                color="blue"
                onClick={handleFormSubmit}
                disabled={isSubmitDisabled}
              >
                등록하기
              </Button>
            </div>
          </div>
          <MobileFooter homeroot="/workerMain" />
        </div>
      </div>
    </div>
  );
};

export default PickUpPlaceMainPage;
