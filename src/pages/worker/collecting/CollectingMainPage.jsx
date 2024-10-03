import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";
import MobileHeader from "../../../components/menus/MobileHeader";
import MobileFooter from "../../../components/menus/MobileFooter";
import KakaoMap from "../../../components/commons/KakaoMap";
import CardImages from "../../../assets/images/CardImages.jpg";
import { pickUpSpot } from "../../../datas/pickUpSpot.js";
import DetailedSpot from "./component/DetailedSpot.jsx";

const CollectingMainPage = () => {
  const { isLoggedIn, isDriver, memberInfo } = useAuth();
  const navigate = useNavigate();
  // 지도 중심좌표로 보낼 현재 위치 좌표
  const [myCoords, setMyCoords] = useState({ lat: 0, lng: 0 });
  // 작업 추가, 상세확인 등 화면 하단에 작업 진행중인지
  // true 면 지도 크기 줄어듬
  const [onWork, setOnWork] = useState(false);
  // 수거경로 추가한 집하지
  const [pickedSpots, setPickedSpots] = useState([]);
  // 마커 클릭 시 상세정보로 출력되는 집하지
  const [detailedSpot, setDetailedSpot] = useState();
  // 마커 클릭해서 상세정보 보고있는 상태인지
  const [isOnDetailed, setIsOnDetailed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (!isDriver) {
      alert("수거작업은 차량을 등록해야 진행할 수 있습니다.");
      navigate("/workerMain", { replace: true });
    }
  }, [isLoggedIn, isDriver]);

  useEffect(() => {
    const managerId = memberInfo.managerId;
    console.log(managerId);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (error) => {
        alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
      }
    );

    // get("/api/pickUp/managerId")로
    // 내 담당 관리자의 담당구역에서
    // 배정안된 상태의 pickupSpot List 받아오기

    // [pickedSpots] 의존성배열 추가하면
    // 수거 완료할 때마다 post 로 해당 집하지의 state를 수정하고
    // pickedSpots 에서 해당 집하지를 제외함
    // 그러면 자동으로 이 useEffect 가 실행되고
    // 다시 get 으로 "배정안된" 것만 불러옴
    // 지도의 중심좌표도 다시 현재위치로 수정됨
  }, [pickedSpots]);

  const onSpotDetail = (spotId) => {
    setIsOnDetailed(true);
    setOnWork(true);
    setDetailedSpot(spotId);
  };

  // 수거완료 버튼 클릭시
  const onCompletePickUp = (spotId) => {
    // post("api/pickUp/id")로 상태변경해서 보내기
    // 요청 성공시 pickedSpots 에서 지우기
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center p-3">
      <MobileHeader>집하지 지도</MobileHeader>
      <div
        className={`w-full xl:w-3/4 mt-12 xl:mt-14 border border-black ${
          onWork
            ? "h-1/3 xl:h-1/2 rounded-t-md"
            : "h-full mb-12 xl:mb-14 rounded-md"
        }`}
        onDoubleClick={() => setOnWork((prevState) => !prevState)}
      >
        <KakaoMap
          myCoords={myCoords}
          spots={pickUpSpot}
          setDetail={onSpotDetail}
        />
      </div>
      {onWork && (
        <div className="w-full xl:w-3/4 mb-12 xl:mb-14 border border-black rounded-b-md h-2/3 xl:h-1/2">
          {isOnDetailed && (
            <DetailedSpot spot={detailedSpot} onClose={setIsOnDetailed} />
          )}
        </div>
      )}
      <MobileFooter homeroot={"/collectingMain"} />
    </div>
  );
};

export default CollectingMainPage;
