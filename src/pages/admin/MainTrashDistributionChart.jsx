import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/ConditionTabs";
import YearAndMonthCondition from "../../components/searchCondition/YearAndMonthCondition";
import YearCondition from "../../components/searchCondition/YearCondition";
import Search from "../../components/searchCondition/Search";
import PeriodCondition from "../../components/searchCondition/PeriodCondition";
import MainTrashMap from "../../components/map/MainTrashMap";

const MainTrashDistributionChart = () => {
  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">
          주요 쓰레기 분포
        </h1>
        {/* 연도 탭 */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* ConditionTabs와 YearCondition, Search 사이에 간격 추가 */}
            {<ConditionTabs className="m-0" />}

            {/* YearCondition과 Search는 나란히 배치 */}
            <div className="flex items-center space-x-4">
              <YearCondition />
              <Search />
            </div>
          </div>
        </div>

        {/* 월별 탭 */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* ConditionTabs와 YearCondition, Search 사이에 간격 추가 */}
            <ConditionTabs className="m-0" />

            {/* YearCondition과 Search는 나란히 배치 */}
            <div className="flex items-center space-x-4">
              <YearAndMonthCondition />
              <Search />
            </div>
          </div>
        </div>

        {/* 일별 탭 */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* ConditionTabs와 YearCondition, Search 사이에 간격 추가 */}
            <ConditionTabs className="m-0" />

            {/* YearCondition과 Search는 나란히 배치 */}
            <div className="flex items-center space-x-4">
              <PeriodCondition />
              <Search />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-14 py-14 mb-8 h-[700px]">
          {/* 주요쓰레기 분포도 */}
          <MainTrashMap />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default MainTrashDistributionChart;
