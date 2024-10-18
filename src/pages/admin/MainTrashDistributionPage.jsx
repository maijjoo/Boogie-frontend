import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useResetConditions } from "../../hooks/useResetConditions";
import { getSearched } from "../../api/mainTrashDistributionApi";
import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/ConditionTabs";
import YearAndMonthCondition from "../../components/searchCondition/YearAndMonthCondition";
import YearCondition from "../../components/searchCondition/YearCondition";
import Search from "../../components/searchCondition/Search";
import PeriodCondition from "../../components/searchCondition/PeriodCondition";
import KakaoMap from "../../components/commons/KakaoMap";

const MainTrashDistributionPage = () => {
  useResetConditions("all");

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
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    if (!isLoggedIn || role === "WORKER") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

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

  const getSearchData = () => {
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

    const doSearch = async () => {
      try {
        const res = await getSearched(searchParam);
        if (res.data && res.data.length > 0) {
          console.log(res);

          setSearchedData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    doSearch();
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1
          className="text-xl font-bold mb-2 text-blue-700 inline-block cursor-pointer"
          onClick={() => navigate("/mainTrashDistribution")}
        >
          주요 쓰레기 분포
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
                onSearch={getSearchData}
                searchParam={searchParam}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg shadow px-14 py-14 mb-8 h-[700px]">
          <KakaoMap myCoords={myCoords} searchedData={searchedData} />
          <div className="w-full flex flex-wrap justify-center mt-4">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-[#EB3223] mr-2"></div>
              <span className="text-[#EB3223] font-extrabold">부표류</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-[#F29D38] mr-2"></div>
              <span className="text-[#F29D38] font-extrabold">
                생활쓰레기류
              </span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-[#00D93A] mr-2"></div>
              <span className="text-[#00D93A] font-extrabold">
                대형 투기쓰레기류
              </span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-[#8B2CF5] mr-2"></div>
              <span className="text-[#8B2CF5] font-extrabold">초목류</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-[#0021F5] mr-2"></div>
              <span className="text-[#0021F5] font-extrabold">폐어구류</span>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default MainTrashDistributionPage;
