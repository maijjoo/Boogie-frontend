import React, { useState } from "react";
import dot from "../../../assets/icons/write/Circle.svg";
import plus from "../../../assets/icons/write/Plus.svg";
import cancel from "../../../assets/icons/write/Cancel.svg";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/commons/InputWithLabel.jsx";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import { NaturalDisasterList } from "../../../datas/NaturalDisasterList.js";
import { BeachNameList } from "../../../datas/BeachNameList.js";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel.jsx";
import CameraController from "../../../components/commons/CameraController.jsx";
import Button from "../../../components/commons/Button.jsx";
import FormSub from "../../../components/commons/FormSub.jsx";

const ResearchMainPage = () => {
  const navigate = useNavigate();

  // 임시저장 모달을 띄우기 위한 state
  // const [isTempExists, setIsTempExists] = useState(false);

  // 해안명 관리 state
  const [beachName, setBeachName] = useState("");

  const [subs, setSubs] = useState([]);

  // 해안명 자동완성 드랍다운
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleBeachNameChange = (e) => {
    const beachname = e.target.value.trim();
    setBeachName(beachname);

    const filtered = BeachNameList.filter((option) =>
      option.toLowerCase().includes(beachname.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  // 팀원 입력 input 자동완성 렌더링을 위한 state
  const [inputName, setInputName] = useState("");

  // 조사 시작 여부 파악하는 state
  const [isResearching, setIsResearching] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);

  // 팀원 리스트 state
  const [teamList, setTeamList] = useState([]);

  // 체크박스 관리 state
  const [selected, setSelected] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelected(selected === index ? null : index);
  };

  // 일단 테스트 위해 username 으로 받음
  // 나중에 ID로 변경
  const handleValidTeam = (username) => {
    //  나와 같은 관리자에 속한 유저인지,
    //  중복인지 체크 후 setTeamList
    if (username.trim() !== "") {
      setTeamList((prevTeam) => [...prevTeam, username]);
      setInputName("");
    }
  };

  const handleDeleteTeam = (username) => {
    // 팀원 지우기
    setTeamList((prevTeam) => prevTeam.filter((team) => team !== username));
  };

  const isReady =
    beachName.trim() !== "" && teamList.length > 0 && selected !== null;

  return (
    <div className="w-full max-h-full flex flex-col items-center px-3">
      <MobileHeader>조사 보고서</MobileHeader>

      <div className="w-full xl:w-1/3 h-4/5 border border-black rounded-md mt-4 mb-2 p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-between mb-2">
            <label>
              <img src={dot} alt="dot" className="w-1 me-2 inline" />
              해안명
            </label>
            <input
              value={beachName}
              onChange={handleBeachNameChange}
              className="p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 ms-10 w-1/2"
              list="options"
              placeholder="해안명을 입력하세요"
            />
            <datalist id="options">
              {filteredOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
            {/* 이쁘게 바꾸기 */}
          </div>
          <div className="w-full flex flex-col justify-start mb-2">
            <InputWithLabel
              labelClass="inline mb-2"
              className="inline w-full me-10"
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
              inputChild={
                <img
                  src={plus}
                  alt="plus"
                  className="inline w-8 cursor-pointer"
                  onClick={() => {
                    handleValidTeam(inputName);
                  }}
                />
              }
            >
              <img src={dot} alt="dot" className="w-1 me-2 inline" />
              조사 인원
            </InputWithLabel>
            {teamList.length > 0 && (
              <ul className="flex flex-wrap">
                {teamList.map((team, index) => (
                  <li key={index} className="my-1 me-1 flex items-center">
                    <p className=" max-w-24 xl:max-w-32 flex justify-between p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600">
                      {team}
                      <img
                        src={cancel}
                        alt="cancel"
                        className="inline w-5 ms-1 cursor-pointer"
                        onClick={() => handleDeleteTeam(team)}
                      />
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {/* 해안명처럼 유사한 값 리스트 */}
          </div>
          <div className="w-full flex flex-col justify-start mb-2">
            <label className="inline mb-1">
              <img src={dot} alt="dot" className="w-1 me-2 inline" />
              자연재해 유무
            </label>
            <p className="text-xs">
              최근 5일 이내 발생한 자연재해를 선택해 주세요
            </p>
          </div>
          <div className="w-full">
            <ul className="items-center">
              {NaturalDisasterList.map((list, index) => (
                <li key={index} className="text-start">
                  <CheckBoxWithLabel
                    checked={selected === index}
                    onChange={() => handleCheckboxChange(index)}
                  >
                    {list}
                  </CheckBoxWithLabel>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* 접기 */}

      <div className="w-full xl:w-1/3 mt-3">
        <Button
          className="w-full py-4 rounded-lg"
          color={isReady ? "blue" : "gray"}
          disabled={!isReady}
          onClick={() => setIsResearching(true)}
        >
          조사시작
        </Button>
        {/* 조사 시작 시 버튼 비활성화 및 아래 버튼 추가 */}
      </div>
      {isResearching && <CameraController />}

      {isResearching && <FormSub beachName={beachName} subs={subs} />}

      <MobileFooter homeroot="/workerMain" />
    </div>
  );
};

export default ResearchMainPage;
