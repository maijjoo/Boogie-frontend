import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/ConditionTabs";
import YearAndMonthCondition from "../../components/searchCondition/YearAndMonthCondition";
import YearCondition from "../../components/searchCondition/YearCondition";
import Search from "../../components/searchCondition/Search";
import PeriodCondition from "../../components/searchCondition/PeriodCondition";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";
import KakaoMap from "../../components/commons/KakaoMap";
import { getPredicted } from "../../api/pickupPredictApi";

const PickupPredictPage = () => {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const [condition, setCondition] = useState("year");
  const [myCoords, setMyCoords] = useState({ lat: 0, lng: 0 });
  const [searchParam, setSearchParam] = useState({
    year: null,
    month: null,
    start: null,
    end: null,
  });
  const [predictedData, setPredictedData] = useState([]);
  const [trashs, setTrashs] = useState([]);

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  });

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

    getLocation();
  }, []);

  const getPredictedData = () => {
    if (condition === "year" && searchParam.year !== null) {
      setSearchParam((prev) => ({
        year: prev.year,
        month: null,
        start: null,
        end: null,
      }));
    } else if (
      condition === "month" &&
      searchParam.year !== null &&
      searchParam.month !== null
    ) {
      setSearchParam((prev) => ({
        year: prev.year,
        month: prev.month,
        start: null,
        end: null,
      }));
    } else if (
      condition === "day" &&
      searchParam.start !== null &&
      searchParam.end !== null
    ) {
      setSearchParam((prev) => ({
        year: null,
        month: null,
        start: prev.start,
        end: prev.end,
      }));
    }

    const doPredict = async () => {
      try {
        const res = await getPredicted(searchParam);
        if (res.data && res.data.length > 0) {
          console.log(res);
          const mergedData = res.data.reduce((acc, curr) => {
            // 현재 구역이 이미 결과 배열에 있는지 확인
            const existing = acc.find(
              (item) => item.beachName === curr.beachName
            );

            if (existing) {
              // 이미 있는 구역이면 쓰레기양을 합산
              existing.expectedTrashAmount += curr.expectedTrashAmount;
            } else {
              acc.push({ ...curr });
            }

            return acc;
          }, []);
          setPredictedData(mergedData);
          const trashAmounts = mergedData.map(
            (item) => item.expectedTrashAmount
          );
          const minTrashAmount = Math.min(...trashAmounts);
          const maxTrashAmount = Math.max(...trashAmounts);
          const range = (maxTrashAmount - minTrashAmount) / 5;
          const bins = [];

          for (let i = 0; i < 5; i++) {
            const binMin = Math.round(minTrashAmount + range * i);
            const binMax = Math.round(minTrashAmount + range * (i + 1));

            bins.push({
              binMin: binMin,
              binMax: binMax,
              label: `${binMax} ~ ${binMin} 톤(t)`,
            });
          }
          setTrashs(bins);
        }
      } catch (error) {
        console.log(error);
      }
    };

    doPredict();
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">
          수거 예측량 분포
        </h1>
        {/* 조건 선택 탭 */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* ConditionTabs와 YearCondition, Search 사이에 간격 추가 */}
            {
              <ConditionTabs
                setActiveTab={setCondition}
                activeTab={condition}
                initSearchParam={setSearchParam}
                className="m-0"
              />
            }

            <div className="flex items-center space-x-4">
              {condition === "year" ? (
                <YearCondition handleSelect={setSearchParam} />
              ) : condition === "month" ? (
                <YearAndMonthCondition handleSelect={setSearchParam} />
              ) : (
                <PeriodCondition handleSelect={setSearchParam} />
              )}
              <Search
                condition={condition}
                onSearch={getPredictedData}
                searchParam={searchParam}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg shadow px-14 py-14 mb-8 h-[700px]">
          <KakaoMap myCoords={myCoords} predictedData={predictedData} />
          {trashs && trashs.length > 0 && (
            <div className="w-full flex flex-wrap justify-center mt-4">
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-[#EB3223] mr-2"></div>
                <span className="text-[#EB3223] font-extrabold">
                  {trashs[4].label}
                </span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-[#F29D38] mr-2"></div>
                <span className="text-[#F29D38] font-extrabold">
                  {trashs[3].label}
                </span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-[#00D93A] mr-2"></div>
                <span className="text-[#00D93A] font-extrabold">
                  {trashs[2].label}
                </span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-[#8B2CF5] mr-2"></div>
                <span className="text-[#8B2CF5] font-extrabold">
                  {trashs[1].label}
                </span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-[#0021F5] mr-2"></div>
                <span className="text-[#0021F5] font-extrabold">
                  {trashs[0].label}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default PickupPredictPage;
