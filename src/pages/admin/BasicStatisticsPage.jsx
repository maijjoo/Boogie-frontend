import { useState, useEffect } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/ConditionTabs";
import BeachCondition from "../../components/searchCondition/BeachCondition";
import BasicStatisticsYearlyChart from "../../components/chart/BasicStatisticsYearlyChart";
import BasicStatisticsYearlyTable from "../../components/table/BasicStatisticsYearlyTable";
import BasicStatisticsMonthlyChart from "../../components/chart/BasicStatisticsMonthlyChart";
import BasicStatisticsMonthlyTable from "../../components/table/BasicStatisticsMonthlyTable";
import BasicStatisticsDailyChart from "../../components/chart/BasicStatisticsDailyChart";
import BasicStatisticsDailyTable from "../../components/table/BasicStatisticsDailyTable";
import YearAndMonthCondition from "../../components/searchCondition/basic/YearAndMonthCondition.jsx";
import YearCondition from "../../components/searchCondition/basic/YearCondition";
import ExcelIcon from "../../assets/icons/write/ExcelIcon.png";
import * as XLSX from "xlsx"; // 엑셀 라이브러리 추가

const BasicStatisticsPage = () => {
  const [activeTab, setActiveTab] = useState("year");
  const [yearlyData, setYearlyData] = useState([]); // 연도별 데이터를 저장할 상태
  const [monthlyData, setMonthlyData] = useState([]); // 월별 데이터를 저장할 상태
  const [dailyData, setDailyData] = useState([]); // 일별 데이터를 저장할 상태
  const [chartData, setChartData] = useState([]); // 차트에 사용할 데이터 상태
  const [selectedYear, setSelectedYear] = useState(""); // YearCondition에서 선택한 연도 상태
  const [selectedYears, setSelectedYears] = useState(""); // YearAndMonthCondition 에서 선택한 연도 상태
  const [selectedMonth, setSelectedMonth] = useState(""); // YearAndMonthCondition 에서 선택한 월 상태

  const downloadExcel = () => {
    let dataToExport = [];

    // 현재 활성화된 탭에 따라 데이터를 설정
    if (activeTab === "year") {
      dataToExport = yearlyData;
    } else if (activeTab === "month") {
      dataToExport = monthlyData;
    } else if (activeTab === "day") {
      dataToExport = dailyData;
    }

    // 데이터를 워크시트로 변환
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // 엑셀 파일 다운로드
    XLSX.writeFile(workbook, "BasicStatisticsData.xlsx");
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleYearAndMonthChange = (years, month) => {
    setSelectedYears(years);
    setSelectedMonth(month);
  };

  // yearlyData가 변경될 때마다 차트 데이터를 업데이트
  useEffect(() => {
    if (yearlyData && yearlyData.length > 0) {
      const formattedData = yearlyData.map((item) => ({
        name: `${item.year}년`, // 연도
        폐어구류: item.fishingGearWasteTons || 0,
        초목류: item.vegetationWasteTons || 0,
        "대형 투기쓰레기류": item.largeDisposalWasteTons || 0,
        생활쓰레기류: item.householdWasteTons || 0,
        부표류: item.buoyDebrisTons || 0,
      }));
      setChartData(formattedData);
    } else {
      setChartData([]);
    }
  }, [yearlyData]);

  useEffect(() => {
    if (monthlyData && monthlyData.length > 0) {
      const formattedData = monthlyData.map((item) => ({
        name: `${item.month}월`, // 월
        폐어구류: item.fishingGearWasteTons || 0,
        초목류: item.vegetationWasteTons || 0,
        "대형 투기쓰레기류": item.largeDisposalWasteTons || 0,
        생활쓰레기류: item.householdWasteTons || 0,
        부표류: item.buoyDebrisTons || 0,
      }));
      setChartData(formattedData);
    } else {
      setChartData([]);
    }
  }, [monthlyData]);

  useEffect(() => {
    if (dailyData && dailyData.length > 0) {
      const formattedData = dailyData.map((item) => ({
        name: `${item.day}일`, // 일
        폐어구류: item.fishingGearWasteTons || 0,
        초목류: item.vegetationWasteTons || 0,
        "대형 투기쓰레기류": item.largeDisposalWasteTons || 0,
        생활쓰레기류: item.householdWasteTons || 0,
        부표류: item.buoyDebrisTons || 0,
      }));
      setChartData(formattedData);
    } else {
      setChartData([]);
    }
  }, [dailyData]);

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
              {/* BeachCondition에서 데이터 상태를 업데이트하도록 설정 */}
              <BeachCondition onYearlyDataChange={setYearlyData} />
            </div>
          </div>
        )}

        {/* ConditionTabs에 activeTab과 setActiveTab 전달 */}
        {activeTab === "month" && (
          <div className="bg-white rounded-lg shadow px-6 py-4 mb-8 h-40">
            <div className="flex items-center justify-between w-full">
              <ConditionTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {/* BeachCondition에서 데이터 상태를 업데이트하도록 설정 */}
            </div>
            <div className="flex justify-between">
              <YearCondition onChangeYear={handleYearChange} />
              <BeachCondition
                onMonthlyDataChange={setMonthlyData}
                selectedYear={selectedYear}
              />
            </div>
          </div>
        )}

        {activeTab === "day" && (
          <div className="bg-white rounded-lg shadow px-6 py-4 mb-8 h-40">
            <div className="flex items-center justify-between w-full">
              <ConditionTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="flex justify-between">
              <YearAndMonthCondition onChange={handleYearAndMonthChange} />
              <BeachCondition
                onDailyDataChange={setDailyData}
                selectedYears={selectedYears}
                selectedMonth={selectedMonth}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow px-14 py-8 mb-8">
          <div className="text-gray-500 ml-8">단위(t)</div>
          {activeTab === "year" && (
            <>
              <BasicStatisticsYearlyChart data={chartData} />
            </>
          )}
          {activeTab === "month" && (
            <>
              <BasicStatisticsMonthlyChart data={chartData} />
            </>
          )}
          {activeTab === "day" && (
            <>
              <BasicStatisticsDailyChart
                data={chartData}
                selectedYears={selectedYears}
                selectedMonth={selectedMonth}
              />
            </>
          )}
        </div>

        {/* 엑셀 다운로드 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadExcel}
            className="px-2 py-2 text-white bg-custom-green rounded-md flex items-center justify-center"
          >
            <img src={ExcelIcon} alt="ExcelIcon" className="w-5 h-5 me-2" />
            <div>Excel 다운</div>
          </button>
        </div>
        <div className="bg-white rounded-lg shadow px-14 py-8">
          {activeTab === "year" && (
            <>
              <BasicStatisticsYearlyTable yearlyData={yearlyData} />
            </>
          )}
          {activeTab === "month" && (
            <>
              <BasicStatisticsMonthlyTable
                monthlyData={monthlyData}
                selectedYear={selectedYear}
              />
            </>
          )}
          {activeTab === "day" && (
            <>
              <BasicStatisticsDailyTable
                dailyData={dailyData}
                selectedYears={selectedYears}
                selectedMonth={selectedMonth}
              />
            </>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default BasicStatisticsPage;
