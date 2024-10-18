const ConditionTabs = ({
  activeTab,
  setActiveTab,
  initSearchParam = null,
  tabNames = [], // 각 탭의 이름을 배열 형태로 받습니다
  tabKeys = [], // 각 탭의 key를 배열로 받습니다
  searchParams = {
    beachName: "",
  }, // 기본값 설정
  handleOnSearch = null,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 h-16 me-10">
      {tabNames.map((name, index) => (
        <button
          key={index}
          className={`w-28 h-12 px-4 py-2 ${
            activeTab === tabKeys[index]
              ? "bg-blue-700 text-white hover:bg-blue-800 transition" // 활성화된 탭
              : "bg-white text-blue-700 border-2 border-blue-700 " // 비활성화된 탭
          } text-[12pt] rounded-lg text-bold transition-colors duration-200`}
          onClick={() => {
            setActiveTab(tabKeys[index]);
            if (handleOnSearch) {
              handleOnSearch();
            }
            if (initSearchParam) {
              initSearchParam(searchParams);
            } // 전달된 searchParams 사용
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default ConditionTabs;
