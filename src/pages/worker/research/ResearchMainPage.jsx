import React, { useEffect, useState, useRef } from "react";
import dot from "../../../assets/icons/write/Circle.svg";
import plus from "../../../assets/icons/write/Plus.svg";
import cancel from "../../../assets/icons/write/Cancel.svg";
import { json, useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/commons/InputWithLabel.jsx";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import { NaturalDisasterList } from "../../../datas/NaturalDisasterList.js";
import { BeachNameList } from "../../../datas/BeachNameList.js";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel.jsx";
import CameraController from "../../../components/commons/CameraController.jsx";
import Button from "../../../components/commons/Button.jsx";
import FormSub from "../../../components/commons/FormSub.jsx";
import { MatchUsername } from "../../../datas/MatchUsername.js";
import { postAdd } from "../../../api/researchApi.js";
import { API_SERVER_HOST } from "../../../api/commonApi.js";
import axios from "axios";

const initState = {
  researcherUsername: "",
  beachName: "",
  totalBeachLength: "",
  expectedTrashAmount: "",
  weather: "",
  specialNote: "",
  researchSubList: [
    {
      beachNameWithIndex: "",
      startLatitude: "",
      startLongitude: "",
      endLatitude: "",
      endLongitude: "",
      mainTrashType: "",
    },
  ],
};

const ResearchMainPage = () => {
  const navigate = useNavigate();

  // 임시저장 모달을 띄우기 위한 state
  // const [isTempExists, setIsTempExists] = useState(false);

  const [subs, setSubs] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [formImgs, setFormImgs] = useState([]);
  const [trashAmount, setTrashAmount] = useState(0);

  const uploadRef = useRef();
  const [result, setResult] = useState(false);

  const [isSubOnWrite, setIsSubOnWrite] = useState(false);
  const [startCoords, setStartCoords] = useState();

  const [isMainFormCollapsed, setIsMainFormCollapsed] = useState(undefined);
  const [canSubmit, setCanSubmit] = useState(false);

  // 해안명 관리 state
  const [beachName, setBeachName] = useState("");

  // 해안명 자동완성 드랍다운
  const [beachNameOptions, setBeachNameOptions] = useState([]);

  const handleBeachNameChange = (e) => {
    const beachname = e.target.value.trim();
    setBeachName(beachname);

    const filtered = BeachNameList.filter((option) =>
      option.toLowerCase().includes(beachname.toLowerCase())
    );
    setBeachNameOptions(filtered);
  };

  const [inputName, setInputName] = useState("");
  // 팀원 입력 input 자동완성 렌더링을 위한 state
  const [inputNameOptions, setInputNameOptions] = useState([]);

  const handleInputNameChange = (e) => {
    const inputname = e.target.value.trim();
    setInputName(inputname);

    const filtered = MatchUsername.filter((option) =>
      option.toLowerCase().includes(inputname.toLowerCase())
    );
    setInputNameOptions(filtered);
  };

  // 조사 시작 여부 파악하는 state
  const [isResearching, setIsResearching] = useState(false);

  // 조사 메인폼 접기 펴기
  const [isFlipped, setIsFlipped] = useState(undefined);

  // 팀원 리스트 state
  const [teamList, setTeamList] = useState([]);

  // 체크박스 관리 state
  const [selected, setSelected] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelected(selected === index ? null : index);
  };

  const handleValidTeam = (username) => {
    if (username.trim() !== "") {
      setTeamList((prevTeam) => [...prevTeam, username]);
      setInputName("");
    }
  };

  const handleDeleteTeam = (username) => {
    // 팀원 지우기
    setTeamList((prevTeam) => prevTeam.filter((team) => team !== username));
    console.log(imgs);
  };

  const isMainFormComplete =
    beachName.trim() !== "" && teamList.length > 0 && selected !== null;

  const hasActiveSubForm = isSubOnWrite;

  const canSubmitForm = subs.length > 0 && !hasActiveSubForm;

  const handleStartResearch = () => {
    setIsResearching(true);
    setIsMainFormCollapsed(true);
    setIsSubOnWrite(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStartCoords([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
      }
    );
  };

  const handleAddNewSubForm = () => {
    setIsSubOnWrite(true);
    setCanSubmit(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStartCoords([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
      }
    );
  };

  const onMainFormSubmit = async () => {
    try {
      const main = {
        researcherUsername: "W_testWorker", // 작성자
        beachName: beachName, //beachName
        totalBeachLength: "", //각 sub의 위경도로 길이 구한 총합 빈값으로 보내도됨
        expectedTrashAmount: trashAmount, // 각 sub의 trashAmount 총합
        weather: "", // api 로 따와서 넘김
        specialNote: NaturalDisasterList[selected], // 재연재해 값
        researchSubList: subs, //서브조사 리스트
      };

      console.log("=----------d이미지스", formImgs);

      console.log("main----------", main);

      console.log("----요청 전송--------------");

      const formData = new FormData();

      // 이미지 ref 로 연결하기
      const files = formImgs;

      console.log("--------------------files: ", files);

      if (files !== null && files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
          console.log("---------files[i]", files[i]);
        }
      }
      console.log("---------formData", formData.get("files"));
      formData.append("json", JSON.stringify(main));

      // 나중에 바꿔야함
      // postAdd(formData).then((data) => {
      //   setResult(data.result);
      //   console.log("-------------------");
      //   console.log(data.result);
      // });

      postAdd(formData).then((data) => {
        setResult(data.result);
        console.log("-----------data.result");
        console.log(data.result);
      });

      // const result = await postAdd(formData);
      // console.log("API Response: ", result);
      // setResult(result.result);
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="w-full max-h-full flex flex-col items-center px-3">
      <MobileHeader>조사 보고서</MobileHeader>

      {/* 메인 폼 */}
      <div className="w-full xl:w-1/3 border border-black rounded-md mt-4 mb-2 p-6">
        {isMainFormCollapsed ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mb-2">
              <div className="flex w-full justify-between">
                <label className="w-full">
                  <img src={dot} alt="dot" className="w-1 me-2 inline" />
                  해안명
                </label>
                <div
                  className="w-full xl:w-1/3 flex justify-end cursor-pointer"
                  onClick={() => {
                    setIsMainFormCollapsed((prev) => !prev);
                  }}
                >
                  <p>
                    {isMainFormCollapsed !== undefined
                      ? isMainFormCollapsed
                        ? "펴기▼"
                        : "접기▲"
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mt-3">
                <label className="block p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 w-full">
                  {beachName}
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mb-2">
              <div className="flex w-full justify-between">
                <label className="w-full">
                  <img src={dot} alt="dot" className="w-1 me-2 inline" />
                  해안명
                </label>
                {isMainFormCollapsed !== undefined && (
                  <div
                    className="w-full xl:w-1/3 flex justify-end cursor-pointer"
                    onClick={() => {
                      setIsMainFormCollapsed((prev) => !prev);
                    }}
                  >
                    <p>
                      {isMainFormCollapsed !== undefined
                        ? isMainFormCollapsed
                          ? "펴기▼"
                          : "접기▲"
                        : null}
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full mt-3">
                <input
                  value={beachName}
                  onChange={handleBeachNameChange}
                  className="block p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 w-full"
                  list="beachoptions"
                  placeholder="해안명을 입력하세요"
                />
                <datalist id="beachoptions">
                  {beachNameOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </div>
              {/* 이쁘게 바꾸기 */}
            </div>
            <div className="w-full flex flex-col justify-start mb-2">
              <label className="inline mb-2">
                <img src={dot} alt="dot" className="w-1 me-2 inline" />
                조사 인원
              </label>
              <div className="flex items-center justify-between">
                <input
                  value={inputName}
                  onChange={handleInputNameChange}
                  className="p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 inline w-full me-10"
                  list="nameoptions"
                />
                <datalist id="nameoptions">
                  {inputNameOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
                <div className="ml-2">
                  <img
                    src={plus}
                    alt="plus"
                    className="inline w-8 cursor-pointer"
                    onClick={() => {
                      handleValidTeam(inputName);
                    }}
                  />
                </div>
              </div>

              {teamList.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {teamList.map((team, index) => (
                    <li key={index} className="my-1 me-1 flex items-center">
                      <div className="flex items-center justify-between p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600">
                        <span>{team}</span>
                        <img
                          src={cancel}
                          alt="cancel"
                          className="inline w-5 ms-1 cursor-pointer"
                          onClick={() => handleDeleteTeam(team)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
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
        )}
      </div>

      {isResearching && <CameraController setSource={setFormImgs} />}

      {/* subs 의 길이에 따라 formsub 렌더링, 있는건 데이터 가져와서 렌더링, 마지막에 빈거 한개 렌더링 */}
      {isResearching && (
        <div className="w-full xl:w-1/3 mt-2">
          {/* 완료된 서브 폼들 (접힌 상태로 표시) */}
          {subs.map((sub, index) => (
            <FormSub
              key={index}
              beachName={beachName}
              subIdx={index}
              setSubs={setSubs}
              isCollapsed={true}
              data={sub}
            />
          ))}

          {/* 현재 작성 중인 서브 폼 */}
          {isSubOnWrite && (
            <FormSub
              beachName={beachName}
              subIdx={subs.length}
              setSubs={setSubs}
              setSubWrite={setIsSubOnWrite}
              startcoord={startCoords}
              setAmount={setTrashAmount}
              onComplete={() => {
                setIsSubOnWrite(false);
                setCanSubmit(true);
              }}
            />
          )}
          {/* {subs.length > 0 ? (
            subs.map((sub, index) => {
              <FormSub
                beachName={beachName}
                subIdx={index}
                setSubs={setSubs}
                setSubWrite={setIsSubOnWrite}
                startcoord={startCoords}
              />;
            })
          ) : (
            <FormSub
              beachName={beachName}
              subIdx="0"
              setSubs={setSubs}
              setSubWrite={setIsSubOnWrite}
              startcoord={startCoords}
            />
          )}
        </div>
      )}
      {isSubOnWrite && (
        <FormSub
          beachName={beachName}
          subIdx={subs.length - 1}
          setSubs={setSubs}
          setSubWrite={setIsSubOnWrite}
          startcoord={startCoords}
        />
      )} */}
        </div>
      )}

      <div className="w-full xl:w-1/3 mt-3">
        {!isResearching && isMainFormComplete && (
          <Button
            className="w-full py-4 rounded-lg"
            color="blue"
            onClick={handleStartResearch}
          >
            조사시작
          </Button>
        )}

        {isResearching && !isSubOnWrite && (
          <Button
            className="w-full py-4 rounded-lg"
            color="blue"
            onClick={handleAddNewSubForm}
          >
            구역 추가
          </Button>
        )}

        <div className="w-full mt-3 flex">
          <div className="w-1/2 m-1">
            <Button className="w-full py-3 rounded-lg" color="blue">
              임시저장
            </Button>
          </div>
          <div className="w-1/2 m-1">
            <Button
              className="w-full py-3 rounded-lg"
              color={canSubmitForm ? "blue" : "gray"}
              disabled={!canSubmitForm}
              onClick={onMainFormSubmit}
            >
              제출하기
            </Button>
          </div>
        </div>
      </div>

      {/* {isResearching ? (
        <div className="w-full xl:w-1/3 mt-3">
          <Button
            className="w-full py-4 rounded-lg"
            color="blue"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  const coords = [pos.coords.latitude, pos.coords.longitude];
                  setStartCoords(coords);
                },
                (error) => {
                  alert(error);
                  return;
                }
              );
              setIsSubOnWrite(true);
            }}
          >
            추가
          </Button>
        </div>
      ) : (
        <div className="w-full xl:w-1/3 mt-3">
          <Button
            className="w-full py-4 rounded-lg"
            color={isReady ? "blue" : "gray"}
            disabled={!isReady}
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  const coords = [pos.coords.latitude, pos.coords.longitude];
                  setStartCoords(coords);
                },
                (error) => {
                  alert(error);
                  return;
                }
              );
              setIsResearching(true);
              setIsFlipped(true);
              setIsSubOnWrite(true);
            }}
          >
            조사시작
          </Button>
        </div>
      )}
      <div className="w-full xl:w-1/3 mt-3 flex">
        {}
        <div className="w-1/2 m-1">
          <Button className="w-full py-3 rounded-lg" color="blue">
            임시저장
          </Button>
        </div>
        <div className="w-1/2 m-1">
          <Button
            className="w-full py-3 rounded-lg"
            color="gray"
            onClick={onMainFormSubmit}
          >
            제출하기
          </Button>
        </div>
      </div> */}

      <MobileFooter homeroot="/workerMain" />
    </div>
  );
};

export default ResearchMainPage;
