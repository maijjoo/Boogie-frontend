import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/ConditionTabs";
import BeachCondition from "../../components/searchCondition/BeachCondition";
import BasicStatisticsYearlyChart from "../../components/chart/BasicStatisticsYearlyChart";
import BasicStatisticsYearlyTable from "../../components/table/BasicStatisticsYearlyTable";
import BasicStatisticsMonthlyChart from "../../components/chart/BasicStatisticsMonthlyChart";
import BasicStatisticsMonthlyTable from "../../components/table/BasicStatisticsMonthlyTable";
import BasicStatisticsDailyChart from "../../components/chart/BasicStatisticsDailyChart";
import BasicStatisticsDailyTable from "../../components/table/BasicStatisticsDailyTable";
import YearAndMonthCondition from "../../components/searchCondition/YearAndMonthCondition";
import YearCondition from "../../components/searchCondition/YearCondition";
import Search from "../../components/searchCondition/Search";

const BasicStatisticsPage = () => {
  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">기초 통계</h1>
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          {/* 연도 탭 */}
          <div className="flex items-center justify-between w-full">
            <ConditionTabs className="m-0" />
            <div className="flex items-center justify-between w-full">
              <BeachCondition />
              <Search />
            </div>
          </div>
        </div>
        {/* 월별 탭 */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-40">
          <div className="flex items-center justify-between w-full mb-4">
            <ConditionTabs className="m-0" />
          </div>

          <div className="flex items-center justify-between w-full">
            <YearCondition />
            <BeachCondition />
            <Search />
          </div>
        </div>
        {/* 일별 탭 */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-40">
          <div className="flex items-center justify-between w-full mb-4">
            <ConditionTabs className="m-0" />
          </div>

          <div className="flex items-center justify-between w-full">
            <YearAndMonthCondition />
            <BeachCondition />
            <Search />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-14 py-8 mb-8">
          {/* 차트 및 통계 */}
          <div className="text-gray-500 ml-8">단위(t)</div>
          <BasicStatisticsYearlyChart />
          <BasicStatisticsMonthlyChart />
          <BasicStatisticsDailyChart />

          {/* 표 섹션 */}
          <BasicStatisticsYearlyTable />
          <BasicStatisticsMonthlyTable />
          <BasicStatisticsDailyTable />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default BasicStatisticsPage;
