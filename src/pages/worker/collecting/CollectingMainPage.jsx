import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { getSpots, updateSpots } from "../../../api/collectApi.js";
import MobileHeader from "../../../components/menus/MobileHeader";
import KakaoMap from "../../../components/commons/KakaoMap";
import DetailedSpot from "./component/DetailedSpot.jsx";
import FooterInfo from "./component/FooterInfo.jsx";
import useCurrentPosition from "../../../hooks/useCurrentPosition.js";

const CollectingMainPage = () => {
  const { fetchLocation } = useCurrentPosition();

  const { isLoggedIn, isDriver, memberInfo, username, role, managerId } =
    useAuth();
  const navigate = useNavigate();
  // 지도 중심좌표로 보낼 현재 위치 좌표
  const [myCoords, setMyCoords] = useState({ lat: 0, lng: 0 });

  const [neededSpots, setNeededSpots] = useState([]);
  const [addedSpots, setAddedSpots] = useState([]);
  // 마커 클릭 시 상세정보로 출력되는 집하지
  const [detailedSpot, setDetailedSpot] = useState();

  const [onDetail, setOnDetail] = useState(false);
  const [onList, setOnList] = useState(false);

  const fetchData = useCallback(async () => {
    if (!memberInfo?.managerId) return;

    try {
      const spots = await getSpots(memberInfo.managerId);
      if (!Array.isArray(spots)) {
        throw new Error("Invalid data format");
      }

      setNeededSpots(
        spots.filter((spot) => spot.status === "ASSIGNMENT_NEEDED")
      );
      setAddedSpots(
        spots.filter(
          (spot) =>
            spot.status === "ASSIGNMENT_ADDED_TO_ROUTE" &&
            spot.lastModifiedBy === username
        )
      );
    } catch (error) {
      console.error("Failed to fetch spots: ", error);
      alert("데이터 로딩에 실패했습니다.");
    }
  }, [memberInfo?.managerId, username]);

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
      console.log(address);
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || role !== "WORKER") {
      navigate("/", { replace: true });
    }
    if (!isDriver) {
      alert("수거작업은 차량을 등록해야 진행할 수 있습니다.");
      navigate("/workerMain", { replace: true });
    }
  }, [isLoggedIn, isDriver, navigate, role]);

  const getCurrPos = async () => {
    const locData = await fetchLocation();

    if (locData.coords) {
      console.log("좌표 가져오기 성공: ", locData.coords);
      setMyCoords({ lat: locData.coords[0], lng: locData.coords[1] });
    } else if (locData.error) {
      console.log("좌표 가져오기 오류: ", locData.error);
      return;
    }
  };

  useEffect(() => {
    getCurrPos();
  }, []);

  useEffect(() => {
    if (memberInfo?.managerId) {
      fetchData();
    }
  }, [managerId]);

  // // 상태가 added_to_route 인걸 가져옴
  const onUpdateSpot = async (spotId, func) => {
    if (func === "toNeeded") {
      const spotExists = addedSpots.some((spot) => spot === spotId);

      if (spotExists) {
        alert("이미 경로에 추가된 집하지입니다.");
        return;
      }
      setOnDetail(false);
      setDetailedSpot();
    }

    try {
      console.log(
        "status has been updated at spot id: ",
        spotId,
        ", function: ",
        func
      );
      const doUpdate = await updateSpots(spotId, func);
      console.log("update spot response: ", doUpdate);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const onSpotDetail = (spotId) => {
    setOnDetail(true);
    setOnList(false);
    setDetailedSpot(spotId);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      <div className="w-full fixed top-0 z-40">
        <MobileHeader>집하지 지도</MobileHeader>
      </div>
      <div className="w-full mt-12 mb-14 flex-1">
        <div
          className="w-full transition-all duration-500"
          style={{ height: onDetail ? "200px" : "566px" }}
        >
          <KakaoMap
            myCoords={myCoords}
            neededSpots={neededSpots}
            addedSpots={addedSpots}
            setDetail={onSpotDetail}
            nowView={detailedSpot}
          />
        </div>
      </div>
      <div
        className={`w-full fixed z-40 bg-white rounded-t-3xl shadow-lg transition-all duration-500 ease-out`}
        style={{
          top: onDetail ? "calc(100vh - 530px)" : "100vh",
          height: "360px",
          transform: onList ? "translateY(-100vh)" : "translateY(0)",
        }}
      >
        {onDetail && (
          <div
            className="w-full bg-gray-300 rounded-full mb-4"
            style={{ height: "430px" }}
          >
            <DetailedSpot
              fetchAddress={fetchAddress}
              neededSpots={neededSpots}
              addedSpots={addedSpots}
              spot={detailedSpot}
              onClose={setOnDetail}
              onUpdateSpot={onUpdateSpot}
            />
          </div>
        )}
      </div>

      <FooterInfo
        addedSpots={addedSpots}
        onList={onList}
        setOnList={setOnList}
        fetchAddress={fetchAddress}
        onUpdateSpot={onUpdateSpot}
      />
    </div>
  );
};

export default CollectingMainPage;
