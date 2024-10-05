import React, { useEffect, useState } from "react";
import axios from "axios";
import circle from "../../assets/icons/write/circle.svg";
import searchIcon from "../../assets/icons/write/Search.png";

const BeachCondition = ({
  onYearlyDataChange = () => {},
  onMonthlyDataChange = () => {},
  onDailyDataChange = () => {},
  selectedYear = "",
  selectedYears = "",
  selectedMonth = "",
  onSearch,
}) => {
  const [guGunOptions, setGuGunOptions] = useState([]);
  const [beachOptions, setBeachOptions] = useState([]);
  const [selectedGuGun, setSelectedGuGun] = useState("");
  const [selectedBeach, setSelectedBeach] = useState("");
  const [tempBeach, setTempBeach] = useState("");

  // 페이지 로드 시 구/군 데이터 가져오기
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/api/admin/basic-statistics?tapCondition=연도별&beachName="
      )
      .then((response) => {
        const { guGun } = response.data;
        setGuGunOptions(guGun);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // 선택된 구/군에 따라 해안 데이터 설정
  useEffect(() => {
    if (selectedGuGun) {
      axios
        .get(
          "http://localhost:8080/api/admin/basic-statistics?tapCondition=연도별&beachName="
        )
        .then((response) => {
          const { beachName } = response.data;
          setBeachOptions(beachName[selectedGuGun] || []);
        })
        .catch((error) => {
          console.error("Error fetching beach names:", error);
        });
    } else {
      setBeachOptions([]);
    }
  }, [selectedGuGun]);

  const handleSearch = () => {
    // $$$ 새로운 함수 추가
    setSelectedBeach(tempBeach); // 선택된 해안가 명을 설정
    onSearch(tempBeach); // Search 버튼 클릭 시 부모 컴포넌트에 선택된 해안가 명 전달
  };

  // 선택된 해안에 따라 연도별 데이터 설정
  useEffect(() => {
    if (selectedBeach && onYearlyDataChange) {
      axios
        .get(
          `http://localhost:8080/api/admin/basic-statistics?tapCondition=연도별&beachName=${selectedBeach}`
        )
        .then((response) => {
          onYearlyDataChange(response.data.years); // 연도별 통계 데이터를 부모 컴포넌트로 전달
        })
        .catch((error) => {
          console.error("Error fetching yearly data:", error);
        });
    } else {
      onYearlyDataChange([]); // 해안이 선택되지 않았을 때 빈 데이터 전달
    }
  }, [selectedBeach, onYearlyDataChange]);

  // 선택된 해안에 따라 월별 데이터 설정
  useEffect(() => {
    if (selectedBeach && onMonthlyDataChange) {
      axios
        .get(
          `http://localhost:8080/api/admin/basic-statistics?tapCondition=월별&year=${selectedYear}&beachName=${selectedBeach}`
        )
        .then((response) => {
          onMonthlyDataChange(response.data.monthly); // 월별 통계 데이터를 부모 컴포넌트로 전달
        })
        .catch((error) => {
          console.error("Error fetching monthly data:", error);
        });
    } else {
      onMonthlyDataChange([]); // 해안이 선택되지 않았을 때 빈 데이터 전달
    }
  }, [selectedBeach, selectedYear, onMonthlyDataChange]);

  // 선택된 해안에 따라 일별 데이터 설정
  useEffect(() => {
    if (selectedBeach) {
      axios
        .get(
          `http://localhost:8080/api/admin/basic-statistics?tapCondition=일별&year=${selectedYears}&month=${selectedMonth}&beachName=${selectedBeach}`
        )
        .then((response) => {
          onDailyDataChange(response.data.days); // 연도별 통계 데이터를 부모 컴포넌트로 전달
        })
        .catch((error) => {
          console.error("Error fetching daily data:", error);
        });
    } else {
      onDailyDataChange([]); // 해안이 선택되지 않았을 때 빈 데이터 전달
    }
  }, [selectedBeach, selectedYears, selectedMonth, onDailyDataChange]);

  return (
    <div className="flex items-center space-x-2 ml-auto">
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">해안명</div>
      </div>
      <div>
        {/* 구/군 선택 */}
        <select
          className="p-2 w-44 border rounded-s border-gray-300 mr-3"
          value={selectedGuGun}
          onChange={(e) => setSelectedGuGun(e.target.value)}
        >
          <option value="">선택</option>
          {guGunOptions.map((gu, index) => (
            <option key={index} value={gu}>
              {gu}
            </option>
          ))}
        </select>

        {/* 해안 선택 */}
        <select
          className="p-2 w-44 border rounded-s border-gray-300"
          value={tempBeach}
          onChange={(e) => setTempBeach(e.target.value)}
        >
          <option value="">선택</option>
          {beachOptions.map((beach, index) => (
            <option key={index} value={beach}>
              {beach}
            </option>
          ))}
        </select>
      </div>
      <button
        className="px-4 py-2 w-24 h-12 bg-blue-700 text-white rounded-md flex items-center justify-evenly ml-5"
        onClick={handleSearch} // $$$ Search 버튼 클릭 시 handleSearch 호출
      >
        <img src={searchIcon} alt="searchIcon" className="w-5 h-5" />
        <div>검색</div>
      </button>
    </div>
  );
};

export default BeachCondition;
