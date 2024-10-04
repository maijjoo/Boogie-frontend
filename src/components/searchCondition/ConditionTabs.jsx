import { useState } from "react";

const ConditionTabs = () => {
  const [activeTab, setActiveTab] = useState("year"); // 기본으로 '연도별' 탭 선택

  return (
    <div className="flex items-center justify-center space-x-4 h-16">
      {/* 버튼 탭 */}
      <button
        className={`w-24 h-12 px-4 py-2 ${
          activeTab === "year"
            ? "bg-blue-700 text-white"
            : "bg-white text-blue-700 border-2 border-blue-700"
        } text-[12pt] rounded-lg`}
        onClick={() => setActiveTab("year")}
      >
        연도별
      </button>
      <button
        className={`w-24 h-12 px-4 py-2 ${
          activeTab === "month"
            ? "bg-blue-700 text-white"
            : "bg-white text-blue-700 border-2 border-blue-700"
        } text-[12pt] rounded-lg`}
        onClick={() => setActiveTab("month")}
      >
        월별
      </button>
      <button
        className={`w-24 h-12 px-4 py-2 ${
          activeTab === "day"
            ? "bg-blue-700 text-white"
            : "bg-white text-blue-700 border-2 border-blue-700"
        } text-[12pt] rounded-lg`}
        onClick={() => setActiveTab("day")}
      >
        일별
      </button>
      {/* 활성화된 탭에 따른 콘텐츠 */}
      {/* <div>
          {activeTab === "year" && (
            <div>
              <h2 className="text-xl font-bold mb-4">연도별 콘텐츠</h2>
              <p>여기는 연도별 콘텐츠입니다.</p>
            </div>
          )}
  
          {activeTab === "month" && (
            <div>
              <h2 className="text-xl font-bold mb-4">월별 콘텐츠</h2>
              <p>여기는 월별 콘텐츠입니다.</p>
            </div>
          )}
  
          {activeTab === "day" && (
            <div>
              <h2 className="text-xl font-bold mb-4">일별 콘텐츠</h2>
              <p>여기는 일별 콘텐츠입니다.</p>
            </div>
          )}
        </div> */}
    </div>
  );
};

export default ConditionTabs;
