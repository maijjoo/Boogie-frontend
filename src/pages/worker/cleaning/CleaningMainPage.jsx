import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import { getNameList, postAdd } from "../../../api/cleaningApi.js";
import { NaturalDisasterList } from "../../../datas/NaturalDisasterList.js";
import dot from "../../../assets/icons/write/Circle.svg";
import plus from "../../../assets/icons/write/Plus.svg";
import cancel from "../../../assets/icons/write/Cancel.svg";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel.jsx";
import CameraController from "../../../components/commons/CameraController.jsx";
import Button from "../../../components/commons/Button.jsx";
import CleaningFormSub from "../../../components/commons/CleaningFormSub.jsx";
import useCurrentPosition from "../../../hooks/useCurrentPosition.js";
import MobileModal from "../../../components/modal/MobileModal.jsx";

const CleaningMainPage = () => {
  const navigate = useNavigate();
  const { username, isLoggedIn, id, role, nameWithPhone } = useAuth();
  const { fetchLocation } = useCurrentPosition();

  const [result, setResult] = useState(false);
  const [isMainFormComplete, setIsMainFormComplete] = useState(false);
  const [isComplete, setIsComplete] = useState();

  const [startCoords, setStartCoords] = useState();
  const [endCoords, setEndCoords] = useState();
  const [subData, setSubData] = useState({});
  const [isMainFormCollapsed, setIsMainFormCollapsed] = useState(undefined);

  const [bsource, setBSource] = useState([]);
  const [asource, setASource] = useState([]);

  // 해안명 관리 state
  const [beachName, setBeachName] = useState("");
  // 백엔드에서 받아온 담당 해안명
  const [BeachNameList, setBeachNameList] = useState([]);
  // 해안명 자동완성 드랍다운
  const [beachNameOptions, setBeachNameOptions] = useState([]);
  // 팀원이름 입력값
  const [inputName, setInputName] = useState("");
  // 팀원 입력 input 자동완성 렌더링을 위한 state
  const [inputNameOptions, setInputNameOptions] = useState([]);
  // 백엔드에서 받아온 담당 팀원명
  const [MatchUsername, setMatchUsername] = useState([]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isTeamDropdownVisible, setIsTeamDropdownVisible] = useState(false);
  const [refreshB, setRefreshB] = useState(false);
  const [refreshA, setRefreshA] = useState(false);
  const [deleteImgIndex, setDeleteImgIndex] = useState(null);
  const [isDeleteBModalOpen, setIsDeleteBModalOpen] = useState(false);
  const [isDeleteAModalOpen, setIsDeleteAModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const handleBeachNameChange = (e) => {
    const beachname = e.target.value.trim();
    setBeachName(beachname);

    const filtered =
      beachname === ""
        ? BeachNameList
        : BeachNameList.filter((option) =>
            option.toLowerCase().includes(beachname.toLowerCase())
          );
    setBeachNameOptions(filtered);
    setIsDropdownVisible(true);
  };

  useEffect(() => {
    setBeachNameOptions(BeachNameList);
  }, [BeachNameList]);

  // 옵션 선택 핸들러 추가
  const handleOptionSelect = (selectedBeach) => {
    setBeachName(selectedBeach);
    setIsDropdownVisible(false);
  };

  const handleInputNameChange = (e) => {
    const inputname = e.target.value.trim();
    setInputName(inputname);

    const filtered = MatchUsername.filter((option) =>
      option.toLowerCase().includes(inputname.toLowerCase())
    );
    setInputNameOptions(filtered);
  };

  // 조사 시작 여부 파악하는 state
  const [isCleaning, setIsCleaning] = useState(false);
  // 팀원 리스트 state
  const [teamList, setTeamList] = useState([]);
  // 체크박스 관리 state
  const [selected, setSelected] = useState(null);

  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    if (!isLoggedIn || role !== "WORKER") {
      navigate("/", { replace: true });
    }
    if (result === "success") {
      navigate("/cleaningSelect", { replace: true });
    }
  }, [result, isLoggedIn, navigate, role]);

  const handleCheckboxChange = (index) => {
    setSelected(selected === index ? null : index);
  };

  const getNames = async () => {
    try {
      const data = await getNameList(id);
      if (data) {
        setBeachNameList(data?.beachNameList);
        setBeachNameOptions(data?.beachNameList);
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

  useEffect(() => {
    if (BeachNameList.length > 0) {
      setBeachNameOptions(BeachNameList);
    }
  }, [BeachNameList]);

  useEffect(() => {
    setIsMainFormComplete(
      beachName.trim() !== "" && teamList.length > 0 && selected !== null
    );
  }, [beachName, teamList, selected]);

  const canSubmitForm =
    isMainFormComplete &&
    isComplete &&
    bsource.length >= 3 &&
    asource.length >= 3;

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

  const handleDeleteTeam = (username) => {
    // 팀원 지우기
    setTeamList((prevTeam) => prevTeam.filter((team) => team !== username));
  };

  const handleStartCleaning = async () => {
    const locData = await fetchLocation();

    if (locData.coords) {
      console.log("좌표 가져오기 성공: ", locData.coords);
      setStartCoords([locData.coords[0], locData.coords[1]]);
    } else if (locData.error) {
      console.log("좌표 가져오기 오류: ", locData.error);
      return;
    }
    setIsCleaning(true);
    setIsMainFormCollapsed(true);
  };

  const onMainFormSubmit = async () => {
    const locData = await fetchLocation();

    let endCoord = [];
    if (locData.coords) {
      console.log("좌표 가져오기 성공: ", locData.coords);
      setEndCoords([locData.coords[0], locData.coords[1]]);
      endCoord = locData.coords;
    } else if (locData.error) {
      console.log("좌표 가져오기 오류: ", locData.error);
      return;
    }

    try {
      const formData = new FormData();

      const beforeFiles = bsource;
      const afterFiles = asource;

      if (beforeFiles !== null && beforeFiles.length !== 0) {
        for (let i = 0; i < beforeFiles.length; i++) {
          formData.append("beforeFiles", beforeFiles[i]);
        }
      }

      if (afterFiles !== null && afterFiles.length !== 0) {
        for (let i = 0; i < afterFiles.length; i++) {
          formData.append("afterFiles", afterFiles[i]);
        }
      }

      formData.append("cleanerUsername", username); // 작성자
      formData.append("beachName", beachName); // 해안명
      formData.append("totalBeachLength", ""); // 총 길이 (빈 값)
      formData.append("realTrashAmount", subData.realTrashAmount); // 실제 수거량
      formData.append("mainTrashType", subData.mainTrashType); // 주요 쓰레기 유형
      formData.append("startLatitude", startCoords[0]); // 청소 시작 위치 위도
      formData.append("startLongitude", startCoords[1]); // 청소 시작 위치 경도
      formData.append("endLatitude", endCoord[0]); // 청소 끝 위치 위도
      formData.append("endLongitude", endCoord[1]); // 청소 끝 위치 경도
      formData.append("specialNote", NaturalDisasterList[selected]); // 재연재해 값
      formData.append("weather", "맑음");
      formData.append("members", teamList);

      // console.log("-------after/ inject main at form data---------" + formData);

      // 나중에 바꿔야함
      postAdd(formData).then((data) => {
        console.log("---------result----------: ", data.result);
        setResult(data.result);
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  // 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".beach-dropdown")) {
        setIsDropdownVisible(false);
      }
      if (!e.target.closest(".team-dropdown")) {
        setIsTeamDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const handleOpenDeleteBModal = () => {
    setIsDeleteBModalOpen(true);
  };

  const handleCloseDeleteBModal = () => {
    setIsDeleteBModalOpen(false);
  };

  const handleDeleteBImg = (index) => {
    setDeleteImgIndex(index);
    handleOpenDeleteBModal();
  };

  const handleOpenDeleteAModal = () => {
    setIsDeleteAModalOpen(true);
  };

  const handleCloseDeleteAModal = () => {
    setIsDeleteAModalOpen(false);
  };

  const handleDeleteAImg = (index) => {
    setDeleteImgIndex(index);
    handleOpenDeleteAModal();
  };

  const handleConfirmDeleteImg = (type) => {
    if (deleteImgIndex === null) {
      handleCloseDeleteBModal();
      return;
    }
    if (type === "B") {
      setBSource((prevImgs) => prevImgs.filter((_, i) => i !== deleteImgIndex));
      handleCloseDeleteBModal();
      setRefreshB((prev) => !prev);
    } else if (type === "A") {
      setASource((prevImgs) => prevImgs.filter((_, i) => i !== deleteImgIndex));
      handleCloseDeleteAModal();
      setRefreshA((prev) => !prev);
    }
  };

  // refresh 상태가 변경된 후 cleanup
  useEffect(() => {
    if (refreshB) {
      const timeoutId = setTimeout(() => {
        setRefreshB(false);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
    if (refreshA) {
      const timeoutId = setTimeout(() => {
        setRefreshA(false);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [refreshB, refreshA]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <MobileHeader className="fixed top-0 z-50">청소 보고서</MobileHeader>

      {/* 메인 폼 */}
      <div className="w-full px-5 p-3 mt-12 mb-24 ">
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
                <div className="w-full mt-3 relative beach-dropdown">
                  <input
                    type="text"
                    value={beachName}
                    onChange={handleBeachNameChange}
                    onFocus={() => {
                      setBeachNameOptions(BeachNameList);
                      setIsDropdownVisible(true);
                    }}
                    className="block p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 w-full"
                    autoComplete="off"
                    placeholder="해안명을 입력하세요"
                  />
                  {isDropdownVisible && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[100]">
                      {beachNameOptions?.map((beach, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                          onClick={() => handleOptionSelect(beach)}
                        >
                          {beach}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col justify-start mb-4">
                <label className="inline mb-2 font-semibold">
                  <img src={dot} alt="dot" className="w-1 me-2 inline" />
                  청소 인원
                </label>
                <div className="flex items-center justify-between">
                  <div className="relative w-full team-dropdown">
                    <input
                      value={inputName}
                      onChange={handleInputNameChange}
                      onFocus={() => {
                        setInputNameOptions(MatchUsername);
                        setIsTeamDropdownVisible(true);
                      }}
                      placeholder="조사자를 입력해 주세요"
                      className="p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 inline w-full"
                      autoComplete="off"
                    />
                    {isTeamDropdownVisible && (
                      <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[100]">
                        {inputNameOptions.map((name, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                            onClick={() => {
                              handleValidTeam(name);
                              setIsTeamDropdownVisible(false);
                            }}
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {teamList.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
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

        {isCleaning && (
          <CameraController
            setSource={setBSource}
            title="청소전 사진"
            max="15"
            min="3"
            border="p-3 border border-gray-400 rounded-md"
            onDelete={handleDeleteBImg}
            refresh={refreshB}
          />
        )}
        {isCleaning && (
          <CameraController
            setSource={setASource}
            title="청소후 사진"
            max="15"
            min="3"
            border="p-3 border border-gray-400 rounded-md"
            onDelete={handleDeleteAImg}
            refresh={refreshA}
          />
        )}

        {isCleaning && (
          <div className="w-full xl:w-1/3 mt-3">
            <CleaningFormSub
              subData={setSubData}
              setIsComplete={setIsComplete} // 상태 전달
            />
          </div>
        )}

        <div className="w-full xl:w-1/3 flex flex-col justify-center">
          <div className="w-full mt-3 flex items-center p-3">
            {!isCleaning && isMainFormComplete && (
              <Button
                className="w-full py-3 rounded-lg"
                color="blue"
                onClick={handleStartCleaning}
              >
                청소시작
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full xl:w-1/3 mt-3 flex flex-col justify-center">
        <div className="border-t-2 fixed bottom-0 z-50 bg-white w-full flex flex-col justify-center gap-2">
          <div className="flex mt-2 px-2 gap-2">
            <div className="w-1/2 inline-block">
              <Button className="w-full py-3 rounded-lg" color="blue">
                임시저장
              </Button>
            </div>
            <div className="w-1/2 inline-block">
              <Button
                className="w-full py-3 rounded-lg"
                color={canSubmitForm ? "blue" : "gray"}
                disabled={!canSubmitForm}
                onClick={handleOpenSubmitModal}
              >
                제출하기
              </Button>
            </div>
          </div>
          <MobileFooter homeroot="/workerMain" />
        </div>
      </div>

      {isSubmitModalOpen && (
        <MobileModal
          onClose={handleCloseSubmitModal}
          onConfirm={onMainFormSubmit}
          confirmText="제출"
        >
          <p className="font-semibold">보고서를 제출하시겠습니까?</p>
        </MobileModal>
      )}

      {isDeleteBModalOpen && (
        <MobileModal
          onClose={handleCloseDeleteBModal}
          onConfirm={() => handleConfirmDeleteImg("B")}
          confirmText="삭제"
        >
          <p className="font-semibold">사진을 삭제하시겠습니까?</p>
        </MobileModal>
      )}

      {isDeleteAModalOpen && (
        <MobileModal
          onClose={handleCloseDeleteAModal}
          onConfirm={() => handleConfirmDeleteImg("A")}
          confirmText="삭제"
        >
          <p className="font-semibold">사진을 삭제하시겠습니까?</p>
        </MobileModal>
      )}
    </div>
  );
};

export default CleaningMainPage;
