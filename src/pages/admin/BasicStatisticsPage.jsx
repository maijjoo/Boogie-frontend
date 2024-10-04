import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("year");

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">기초 통계</h1>

        {/* ConditionTabs에 activeTab과 setActiveTab 전달 */}

        {activeTab === "year" && (
          <div className="bg-white rounded-lg shadow px-6 py-4 mb-8 h-24">
            <div className="flex items-center justify-between w-full">
              <ConditionTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <BeachCondition />
              <Search />
            </div>
          </div>
        )}

        {activeTab === "month" && (
          <div className="bg-white rounded-lg shadow px-6 py-4 mb-8 h-40">
            <div className="flex items-center justify-between w-full">
              <ConditionTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <BeachCondition />
              <Search />
            </div>
            <YearCondition />
          </div>
        )}

        {activeTab === "day" && (
          <div className="bg-white rounded-lg shadow px-6 py-4 mb-8 h-40">
            <div className="flex items-center justify-between w-full">
              <ConditionTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <BeachCondition />
              <Search />
            </div>
            <YearAndMonthCondition />
          </div>
        )}

        <div className="bg-white rounded-lg shadow px-14 py-8 mb-8">
          <div className="text-gray-500 ml-8">단위(t)</div>
          {activeTab === "year" && (
            <>
              <BasicStatisticsYearlyChart />
              <BasicStatisticsYearlyTable />
            </>
          )}
          {activeTab === "month" && (
            <>
              <BasicStatisticsMonthlyChart />
              <BasicStatisticsMonthlyTable />
            </>
          )}
          {activeTab === "day" && (
            <>
              <BasicStatisticsDailyChart />
              <BasicStatisticsDailyTable />
            </>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default BasicStatisticsPage;
