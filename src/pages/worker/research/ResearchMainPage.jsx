import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import { postAdd, getNameList } from "../../../api/researchApi.js";
import { NaturalDisasterList } from "../../../datas/NaturalDisasterList.js";
import dot from "../../../assets/icons/write/Circle.svg";
import plus from "../../../assets/icons/write/Plus.svg";
import cancel from "../../../assets/icons/write/Cancel.svg";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel.jsx";
import CameraController from "../../../components/commons/CameraController.jsx";
import Button from "../../../components/commons/Button.jsx";
import FormSub from "../../../components/commons/FormSub.jsx";
import useCurrentPosition from "../../../hooks/useCurrentPosition.js";

const ResearchMainPage = () => {
  const navigate = useNavigate();
  const { username, isLoggedIn, id, role, nameWithPhone } = useAuth();
  const { fetchLocation } = useCurrentPosition();

  // 임시저장 모달을 띄우기 위한 state
  // const [isTempExists, setIsTempExists] = useState(false);
  // 등록요청 성공시 리렌더링하기 위함
  const [result, setResult] = useState(false);
  // 서브조사리스트
  const [subs, setSubs] = useState([]);
  // 이미지 등록을 위한 파일 배열
  const [formImgs, setFormImgs] = useState([]);
  // 입력된 쓰레기 예측량(L)
  const [trashAmount, setTrashAmount] = useState(0);
  // 서브폼이 작성중일때 등록버튼 못누르게
  const [isSubOnWrite, setIsSubOnWrite] = useState(false);
  // 서브폼 시작좌표
  const [startCoords, setStartCoords] = useState();
  // 메인폼 접기, undefined는 메인폼 작성중일때
  const [isMainFormCollapsed, setIsMainFormCollapsed] = useState(undefined);
  // 해안명 입력값
  const [beachName, setBeachName] = useState("");
  // 백엔드에서 받아온 담당 해안명
  const [BeachNameList, setBeachNameList] = useState([]);
  // 해안명 자동완성 드랍다운
  const [beachNameOptions, setBeachNameOptions] = useState([]);
  // 팀원이름 입력값
  const [inputName, setInputName] = useState("");
  // 백엔드에서 받아온 담당 팀원명
  const [MatchUsername, setMatchUsername] = useState([]);
  // 팀원이름 자동완성 드랍다운
  const [inputNameOptions, setInputNameOptions] = useState([]);
  // 조사시작 여부 파악하는 state
  const [isResearching, setIsResearching] = useState(false);
  // 팀원 리스트 state
  const [teamList, setTeamList] = useState([]);
  // 체크박스 관리 state
  const [selected, setSelected] = useState(null);
  // 토스트 메세지 출력 여부
  const [toast, setToast] = useState(false);
  // 토스트 메세지 텍스트
  const [toastText, setToastText] = useState("");

  // 로그인 판별, 등록 성공시 초기화
  useEffect(() => {
    if (!isLoggedIn || role !== "WORKER") {
      navigate("/", { replace: true });
    }
    if (result === "success") {
      initializeAllStates();
    }
  }, [result, isLoggedIn, navigate, role]);

  // 내 관리자에 등록된 작업자 리스트 불러오기
  const getNames = async () => {
    try {
      const data = await getNameList(id);
      if (data) {
        setBeachNameList(data?.beachNameList);
        const filteredData = data.nameWithNumberList.filter(
          (item) => item !== nameWithPhone
        );
        setMatchUsername(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNames();
  }, [id]);

  // 등록요청 성공시 초기화
  const initializeAllStates = () => {
    alert("등록완료");
    setSubs([]);
    setFormImgs([]);
    setTeamList([]);
    setTrashAmount(0);
    setStartCoords();
    setIsMainFormCollapsed(undefined);
    setSelected(null);
    setBeachName("");
    setInputName("");
    setIsSubOnWrite(false);
    setIsResearching(false);
    setResult(false);
  };

  const handleBeachNameChange = (e) => {
    const beachname = e.target.value.trim();
    setBeachName(beachname);

    const filtered = BeachNameList.filter((option) =>
      option.toLowerCase().includes(beachname.toLowerCase())
    );
    setBeachNameOptions(filtered);
  };

  const handleInputNameChange = (e) => {
    const inputname = e.target.value.trim();
    setInputName(inputname);

    const filtered = MatchUsername.filter((option) =>
      option.toLowerCase().includes(inputname.toLowerCase())
    );
    setInputNameOptions(filtered);
  };

  const handleCheckboxChange = (index) => {
    setSelected(selected === index ? null : index);
  };

  // 입력한 이름이 유효한지
  // 지금은 그냥 드랍다운에 출력만되지 김 이렇게 입력해도 들어가짐
  // 백엔드에 members 가 유효한지 판단하는 로직 있는지 확인필요
  const handleValidTeam = (username) => {
    if (
      username.trim() !== "" &&
      MatchUsername.includes(username.trim()) &&
      !teamList.includes(username.trim())
    ) {
      setToast(false);
      setToastText("");
      setTeamList((prevTeam) => [...prevTeam, username]);
      setInputName("");
    } else if (teamList.includes(username.trim())) {
      setToastText("이미 등록된 작업자입니다");
      setToast(true);
    }
  };

  // 등록했던 팀원 지우기
  const handleDeleteTeam = (username) => {
    setTeamList((prevTeam) => prevTeam.filter((team) => team !== username));
  };

  const isMainFormComplete =
    beachName.trim() !== "" && teamList.length > 0 && selected !== null;

  const hasActiveSubForm = isSubOnWrite;

  const canSubmitForm =
    subs.length > 0 &&
    !hasActiveSubForm &&
    formImgs.length >= 3 &&
    formImgs.length <= 30;

  const handleStartResearch = async () => {
    const locData = await fetchLocation();

    if (locData.coords) {
      console.log("좌표 가져오기 성공: ", locData.coords);
      setStartCoords([locData.coords[0], locData.coords[1]]);
    } else if (locData.error) {
      console.log("좌표 가져오기 오류: ", locData.error);
      return;
    }
    setIsResearching(true);
    setIsMainFormCollapsed(true);
    setIsSubOnWrite(true);
  };

  const handleAddNewSubForm = async () => {
    const locData = await fetchLocation();

    if (locData.coords) {
      console.log("좌표 가져오기 성공: ", locData.coords);
      setStartCoords([locData.coords[0], locData.coords[1]]);
    } else if (locData.error) {
      console.log("좌표 가져오기 오류: ", locData.error);
      return;
    }
    setIsSubOnWrite(true);
  };

  const onMainFormSubmit = async () => {
    const subsData = subs.map((sub) => sub.data);
    try {
      const main = {
        researcherUsername: username,
        beachName: beachName,
        totalBeachLength: "",
        expectedTrashAmount: trashAmount,
        weather: "", // api 로 따와서 넘김
        specialNote: NaturalDisasterList[selected], // 재연재해 값
        researchSubList: subsData, //서브조사 리스트
        members: teamList,
      };
      const formData = new FormData();

      // 이미지 ref 로 연결하기
      const files = formImgs;

      if (files !== null && files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      formData.append("json", JSON.stringify(main));

      postAdd(formData).then((data) => {
        console.log(data.result);
        setResult(data.result);
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      <MobileHeader className="fixed top-0 z-50">조사 보고서</MobileHeader>

      {/* 메인 폼 */}
      <div className="w-full px-5 p-3 mt-12 mb-24 bg-gray-50">
        <div className="w-full xl:w-1/3 border border-gray-400 rounded-md mb-2 p-4 bg-white">
          {isMainFormCollapsed ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-full flex flex-col mb-4">
                <div className="flex w-full justify-between">
                  <label className="w-full font-semibold">
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
              <div className="w-full flex flex-col mb-4">
                <div className="flex w-full justify-between">
                  <label className="w-full font-semibold">
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
                    placeholder="해안명을 입력해 주세요"
                  />
                  <datalist id="beachoptions">
                    {beachNameOptions.map((option, index) => (
                      <option key={index} value={option} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start mb-4">
                <label className="inline mb-2 font-semibold">
                  <img src={dot} alt="dot" className="w-1 me-2 inline" />
                  조사 인원
                </label>
                <div className="flex items-center justify-between">
                  <input
                    value={inputName}
                    onChange={handleInputNameChange}
                    placeholder="조사자를 입력해 주세요"
                    className="p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 inline w-full me-2"
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
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {toast && (
                      <div>
                        <p className="text-red-500 font-medium text-sm">
                          {toastText}
                        </p>
                      </div>
                    )}
                    {teamList.map((team, index) => (
                      <li key={index} className="me-1 flex items-center">
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
                <label className="inline mb-1 font-semibold">
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

        {isResearching && (
          <CameraController
            setSource={setFormImgs}
            title="해안가 사진"
            max="30"
            min="3"
            border="p-3 border border-gray-400 rounded-md"
          />
        )}

        {/* subs 의 길이에 따라 formsub 렌더링, 있는건 데이터 가져와서 렌더링, 마지막에 빈거 한개 렌더링 */}
        {isResearching && (
          <div className="w-full xl:w-1/3 mt-3">
            {/* 완료된 서브 폼들 (접힌 상태로 표시) */}
            {subs.map((sub, index) => (
              <FormSub
                key={index}
                beachName={beachName}
                subIdx={index}
                isCollapsed={sub.isCollapsed}
                setCollapse={() =>
                  setSubs((prevSubs) => {
                    return prevSubs.map((sub, i) => {
                      if (i === index) {
                        return {
                          ...sub,
                          isCollapsed: !sub.isCollapsed,
                        };
                      }
                      return sub;
                    });
                  })
                }
                deleteSub={() =>
                  setSubs((prevSubs) => prevSubs.filter((_, i) => i !== index))
                }
                _trashAmount={sub.trashAmount}
                mainTrashIndex={sub.data.mainTrashType}
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
                isCollapsed={undefined}
                onComplete={() => {
                  setIsSubOnWrite(false);
                }}
              />
            )}
          </div>
        )}
        <div className="w-full flex items-center pt-3">
          {!isResearching && isMainFormComplete && (
            <Button
              className="w-full py-3 rounded-lg"
              color="blue"
              onClick={handleStartResearch}
            >
              조사시작
            </Button>
          )}

          {isResearching && !isSubOnWrite && (
            <Button
              className="w-full py-3 rounded-lg"
              color="blue"
              onClick={handleAddNewSubForm}
            >
              구역 추가
            </Button>
          )}
        </div>
      </div>

      <div className="w-full xl:w-1/3 mt-3 flex flex-col justify-center">
        <div className="border-t-2 fixed bottom-0 z-40 bg-white w-full flex flex-col justify-center gap-2">
          <div className="flex mt-2 px-2 gap-2">
            <div className="w-1/2 inline-block">
              <Button className="w-full py-3 rounded-lg" color="blue" disabled>
                임시저장
              </Button>
            </div>
            <div className="w-1/2 inline-block">
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
          <MobileFooter homeroot="/workerMain" />
        </div>
      </div>
    </div>
  );
};

export default ResearchMainPage;
