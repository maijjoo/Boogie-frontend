import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";
import MobileHeader from "../../../components/menus/MobileHeader";
import MobileFooter from "../../../components/menus/MobileFooter";
import KakaoMap from "../../../components/commons/KakaoMap";
import DetailedSpot from "./component/DetailedSpot.jsx";
import {
  getSpots,
  updateToAdded,
  updateToNeeded,
  updateToCompleted,
} from "../../../api/collectApi.js";
import PickedSpot from "./component/PickedSpot.jsx";
import FooterInfo from "./component/FooterInfo.jsx";

const CollectingMainPage = () => {
  const { isLoggedIn, isDriver, memberInfo } = useAuth();
  const navigate = useNavigate();
  // 지도 중심좌표로 보낼 현재 위치 좌표
  const [myCoords, setMyCoords] = useState({ lat: 0, lng: 0 });
  // 작업 추가, 상세확인 등 화면 하단에 작업 진행중인지
  // true 면 지도 크기 줄어듬
  const [onWork, setOnWork] = useState(false);

  const [pickUpSpot, setPickUpSpot] = useState([]);
  // 수거경로 추가한 집하지
  const [pickedSpots, setPickedSpots] = useState([]);
  // 마커 클릭 시 상세정보로 출력되는 집하지
  const [detailedSpot, setDetailedSpot] = useState();
  // 마커 클릭해서 상세정보 보고있는 상태인지
  const [isOnDetailed, setIsOnDetailed] = useState(false);

  const [onDetail, setOnDetail] = useState(false);
  const [onList, setOnList] = useState(false);

  const getAddress = useCallback((lat, lng) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const coord = new window.kakao.maps.LatLng(lat, lng);

      const callback = function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result[0].address.address_name);
        } else {
          reject(new Error("Failed to get address."));
        }
      };

      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    });
  }, []);

  const fetchAddress = async (setAddress, lat, lng) => {
    try {
      const address = await getAddress(lat, lng);
      setAddress(address); // 주소 값을 상태로 설정
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (!isDriver) {
      alert("수거작업은 차량을 등록해야 진행할 수 있습니다.");
      navigate("/workerMain", { replace: true });
    }
  }, [isLoggedIn, isDriver, navigate]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setMyCoords({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (error) => {
            alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
          }
        );
      } catch (error) {
        console.error("위치 정보 가져오기 에러: ", error);
      }
    };

    const fetchData = async () => {
      const adminId = memberInfo.managerId;

      try {
        const res = await getSpots(adminId);
        console.log("----------------resdata: ", res);
        res.map((data) => {
          if (data.status !== "ASSIGNMENT_COMPLETED") {
            setPickUpSpot((prevState) => [...prevState, data]);
          }
        });
        setPickUpSpot(res);
      } catch (error) {
        console.error(error);
      }
    };

    getLocation();
    fetchData();

    // get("/api/pickUp/managerId")로
    // 내 담당 관리자의 담당구역에서
    // 배정안된 상태의 pickupSpot List 받아오기

    // [pickedSpots] 의존성배열 추가하면
    // 수거 완료할 때마다 post 로 해당 집하지의 state를 수정하고
    // pickedSpots 에서 해당 집하지를 제외함
    // 그러면 자동으로 이 useEffect 가 실행되고
    // 다시 get 으로 "배정안된" 것만 불러옴
    // 지도의 중심좌표도 다시 현재위치로 수정됨
  }, [memberInfo.managerId]);

  useEffect(() => {
    setPickedSpots(
      pickUpSpot.filter((spot) => spot.status === "ASSIGNMENT_ADDED_TO_ROUTE")
    );
  }, [pickUpSpot]);

  const onSpotDetail = (spotId) => {
    setOnDetail(true);
    setDetailedSpot(spotId);
  };

  const onAddSpot = async (id) => {
    const spotExists = pickedSpots.some((spot) => spot === id);

    if (!spotExists) {
      try {
        const add = await updateToAdded(id);
        console.log("update needed -> added at spot id: ", id);
        console.log("-----------res: ", add);
        alert("집하지가 수거목록에 추가되었습니다.");
        setPickedSpots((prevState) => [...prevState, id]);
        setOnWork(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 구역이 이미 있을 경우
      console.log("already added at spot id: ", id);
      alert("이미 추가된 집하지입니다.");
    }
  };

  const onDropAdded = async (id) => {
    try {
      const drop = await updateToNeeded(id);
      console.log("update added -> needed at spot id: ", id);
      console.log("-----------res: ", drop);

      alert("집하지가 수거목록에서 제거되었습니다.");
      setPickedSpots((prevState) =>
        prevState.filter((prevId) => prevId !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 수거완료 버튼 클릭시
  const onCompletePickUp = async (spotId) => {
    // post("api/pickUp/id")로 상태변경해서 보내기
    // 요청 성공시 pickedSpots 에서 지우기
    try {
      const drop = await updateToCompleted(spotId);
      console.log("update added -> complete at spot id: ", spotId);
      console.log("-----------res: ", drop);

      setPickedSpots((prevState) =>
        prevState.filter((prevId) => prevId !== spotId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // return (
  //   <div className="w-full flex flex-col items-center bg-gray-50">
  //     <div className="w-full fixed top-0 z-50 flex flex-col">
  //       <MobileHeader>집하지 지도</MobileHeader>
  //       {!onList && (
  //         <div
  //           className="w-full flex items-center justify-center border"
  //           style={{ height: onDetail ? "273px" : "560px" }}
  //         >
  //           <KakaoMap
  //             myCoords={myCoords}
  //             spots={pickUpSpot}
  //             setDetail={onSpotDetail}
  //             nowView={detailedSpot}
  //           />
  //         </div>
  //       )}
  //     </div>
  //     <div className="w-full mt-12">
  //       <div className="w-full bg-gray-200">
  //         <div className="mb-12">
  //           {onDetail && (
  //             <DetailedSpot
  //               fetchAddress={fetchAddress}
  //               pickUpSpot={pickUpSpot}
  //               spot={detailedSpot}
  //               onClose={setOnDetail}
  //               onAddSpot={onAddSpot}
  //               onClearSpot={onCompletePickUp}
  //             />
  //           )}
  //           {onList &&
  //             pickedSpots.map((spot, index) => {
  //               <PickedSpot
  //                 fetchAddress={fetchAddress}
  //                 index={Number(index + 1)}
  //                 key={spot.id}
  //                 spot={spot}
  //                 onDrop={onDropAdded}
  //                 onClearSpot={onCompletePickUp}
  //               />;
  //             })}
  //         </div>
  //       </div>
  //     </div>

  //     <div className="w-full fixed bottom-0 z-50">
  //       <FooterInfo
  //         pickedSpot={pickedSpots}
  //         onList={onList}
  //         setOnList={setOnList}
  //       />
  //       <MobileFooter homeroot={"/collectingMain"} />
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      <div
        className={`w-full fixed top-0 z-30 flex flex-col transition-all duration-300 ${
          onList ? "transform -translate-y-full" : ""
        }`}
      >
        <MobileHeader>집하지 지도</MobileHeader>
        <div
          className="w-full flex items-center justify-center border"
          style={{ height: onDetail ? "273px" : "560px" }}
        >
          <KakaoMap
            myCoords={myCoords}
            spots={pickUpSpot}
            setDetail={onSpotDetail}
            nowView={detailedSpot}
          />
        </div>

        {/** 디테일은 여기서 해야될듯? 지도 크기 줄이고 DetailedSpot 컴포넌트 ㄱㄱ */}
      </div>

      {/** 모바일푸터 + 총예상수거량 카드 + 버튼누르면 위로 올라와서 수거경로 리스트까지 나오게하는 개쩌는친구 */}
      <FooterInfo
        pickedSpot={pickedSpots}
        onList={onList}
        setOnList={setOnList}
      />
    </div>
  );
};

export default CollectingMainPage;
