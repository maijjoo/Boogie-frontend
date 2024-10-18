import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewWorks } from "../../hooks/useNewWorks";
import { useAuth } from "../../hooks/useAuth";
import { getNewWorksDetail, getImageByFileName } from "../../api/newWorksApi";
import { getCompletedWorksDetail } from "../../api/workListApi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SidebarLayout from "../../layouts/SidebarLayout";
import dot from "../../assets/icons/write/Circle.svg";
import KakaoMap from "../../components/commons/KakaoMap";
import SubmitModal from "../../components/modal/SubmitModal";

const CleanReportPage = () => {
  const { isLoggedIn, role, id } = useAuth();
  const { handleComplete } = useNewWorks(id);
  const navigate = useNavigate();
  const location = useLocation();
  const { reportId, isNeeded } = location.state || {};
  const [currentBeforeImageIndex, setCurrentBeforeImageIndex] = useState(0);
  const [currentAfterImageIndex, setCurrentAfterImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 이미지 모달 상태
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false); // 승인 모달 상태
  const [myCoords, setMyCoords] = useState({ lat: 0.0, lng: 0.0 });
  const [coordLine, setCoordLine] = useState({
    start: { lat: 0.0, lng: 0.0 },
    end: { lat: 0.0, lng: 0.0 },
  });
  const [beforeImgs, setBeforeImgs] = useState([]);
  const [beforeHDImgs, setBeforeHDImgs] = useState([]);
  const [afterImgs, setAfterImgs] = useState([]);
  const [afterHDImgs, setAfterHDImgs] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [modalCalledFrom, setModalCalledFrom] = useState("before");
  const [teamList, setTeamList] = useState([]);
  const [teamListString, setTeamListString] = useState("");

  const initData = {
    beachName: "",
    beachLength: 0,
    reportTime: "",
    reporter: "",
    trashBags: 0,
    recentDisaster: "",
    weather: "",
  };
  const [detailData, setDetailData] = useState(initData);

  useEffect(() => {
    if (coordLine && coordLine.start) {
      setMyCoords({
        lat: coordLine?.start?.lat || "0",
        lng: coordLine?.start?.lng || "0",
      });
    }
  }, [coordLine]);

  const fetchWorksDetail = async () => {
    try {
      let response;
      if (isNeeded) response = await getNewWorksDetail(reportId, "청소 완료");
      else response = await getCompletedWorksDetail(reportId, "청소");
      // console.log("------------newTasksClean get response: ", response);

      let formattedDate = "날짜 정보 없음";

      if (response.data.cleanDateTime) {
        const date = new Date(response.data.cleanDateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
      }

      if (response.data) {
        const newCoordLine = {
          start: {
            lat: response.data?.startLatitude || "0",
            lng: response.data?.startLongitude || "0",
          },
          end: {
            lat: response.data?.endLatitude || "0",
            lng: response.data?.endLongitude || "0",
          },
        };
        setCoordLine(newCoordLine);
      }

      setDetailData((prevData) => ({
        ...prevData,
        beachName: response.data.beachName,
        trashBags: response.data.realTrashAmount,
        reportTime: formattedDate,
        reporter: response.data.cleanerName,
        recentDisaster: response.data?.specialNote || "없음",
        beachLength: response.data?.beachLength || "0",
        weather: response.data?.weather || "없음",
      }));

      setTeamList([
        response?.data?.cleanerName || "팀장 정보 없음",
        ...(response?.data?.members || "팀원 정보 없음"),
      ]);

      if (
        response.data &&
        response.data.images &&
        response.data.images.length > 0
      ) {
        const fetchImages = async () => {
          try {
            await Promise.all(
              response.data.images.map(async (img) => {
                if (!imgs.includes(img)) {
                  setImgs((prev) => [...prev, img]);
                  const imageUrl = await getImageByFileName(img);
                  const hdImageUrl = await getImageByFileName(
                    img.replace(/^S_/, "")
                  );

                  if (img.startsWith("S_B")) {
                    setBeforeImgs((prev) => [...prev, imageUrl]);
                    setBeforeHDImgs((prev) => [...prev, hdImageUrl]);
                  } else if (img.startsWith("S_A")) {
                    setAfterImgs((prev) => [...prev, imageUrl]);
                    setAfterHDImgs((prev) => [...prev, hdImageUrl]);
                  }
                }
              })
            );
          } catch (error) {
            console.error("Error fetching images:", error);
          }
        };
        fetchImages();
      }
    } catch (error) {
      console.error("데이터 검색 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || role === "WORKER") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  useEffect(() => {
    if (reportId) {
      fetchWorksDetail();
    }
  }, [reportId]);

  useEffect(() => {
    setTeamListString(
      teamList
        .map((team) => team.split(" ")[0])
        .join(", ")
        .trim()
    );
  }, [teamList]);

  const goToPreviousImage = (where) => {
    if (where === "before") {
      setCurrentBeforeImageIndex((prevIndex) =>
        prevIndex === 0 ? beforeImgs.length - 1 : prevIndex - 1
      );
    } else if (where === "after") {
      setCurrentAfterImageIndex((prevIndex) =>
        prevIndex === 0 ? afterImgs.length - 1 : prevIndex - 1
      );
    }
  };

  const goToNextImage = (where) => {
    if (where === "before") {
      setCurrentBeforeImageIndex((prevIndex) =>
        prevIndex === beforeImgs.length - 1 ? 0 : prevIndex + 1
      );
    } else if (where === "after") {
      setCurrentAfterImageIndex((prevIndex) =>
        prevIndex === afterImgs.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openApprovalModal = () => setIsApprovalModalOpen(true);
  const closeApprovalModal = () => setIsApprovalModalOpen(false);

  const handleApprove = async () => {
    setIsApprovalModalOpen(false);

    await handleComplete(reportId);

    if (isNeeded) {
      navigate("/newWorks", { replace: true });
    }
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">
          {isNeeded ? "New 작업" : "작업 조회"}
        </h1>

        {/* 보고서 폼 */}
        <div className="bg-white rounded-lg shadow px-32 py-14">
          <h1 className="text-xl font-bold mb-6 text-black text-center">
            청소 보고서
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {/* 왼쪽 열: 해안가 사진과 지도 */}
            <div className="space-y-6 relative">
              <div>
                <h2 className="mb-2 text-center font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  청소 전 해안가 사진
                </h2>
                <div className="relative">
                  <img
                    src={beforeHDImgs[currentBeforeImageIndex]}
                    alt="청소 전 해안가 사진"
                    className="w-full h-64 rounded-md object-cover cursor-pointer"
                    onClick={() => {
                      openModal();
                      setModalCalledFrom("before");
                    }}
                  />
                  <button
                    onClick={() => goToPreviousImage("before")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => goToNextImage("before")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
                <div className="flex justify-between w-full mt-3 gap-2 overflow-x-scroll">
                  {beforeImgs.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-1/3 h-24 rounded-md object-cover cursor-pointer ${
                        index === currentBeforeImageIndex
                          ? "border-2 border-blue-500"
                          : "border"
                      }`}
                      onClick={() => setCurrentBeforeImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-2 text-center font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  청소 후 해안가 사진
                </h2>
                <div className="relative">
                  <img
                    src={afterHDImgs[currentAfterImageIndex]}
                    alt="청소 후 해안가 사진"
                    className="w-full h-64 rounded-md object-cover cursor-pointer"
                    onClick={() => {
                      openModal();
                      setModalCalledFrom("after");
                    }} // 이미지 클릭 시 모달 열기
                  />
                  <button
                    onClick={() => goToPreviousImage("after")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => goToNextImage("after")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
                <div className="flex justify-between w-full mt-3 gap-2 overflow-x-scroll">
                  {afterImgs.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-1/3 h-24 rounded-md object-cover cursor-pointer ${
                        index === currentAfterImageIndex
                          ? "border-2 border-blue-500"
                          : "border"
                      }`}
                      onClick={() => setCurrentAfterImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-center font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  청소 위치
                </h2>
                <div className="flex flex-col items-center border border-gray-200 rounded-b-lg  mb-8 w-full h-64">
                  <KakaoMap myCoords={myCoords} line={coordLine} />
                </div>
              </div>
            </div>

            {/* 오른쪽 열: 해안 정보 */}
            <div className="flex flex-col h-full space-y-10">
              <DataDisplay label="해안명" value={detailData.beachName} />
              <DataDisplay
                label="해안 길이(m)"
                value={detailData.beachLength}
              />
              <DataDisplay label="청소 일자" value={detailData.reportTime} />
              <DataDisplay label="청소 인원" value={teamListString} />
              <div className="flex flex-col space-y-2">
                <label className="block text-gray-700 text-sm mb-1 font-semibold  ">
                  <img src={dot} alt="dot" className="w-1 me-2 inline " /> 실제
                  쓰레기양(50L 마대)
                </label>
                <div className="flex space-x-2">
                  <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-1/2">
                    {detailData.trashBags}개
                  </p>
                  <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-1/2">
                    {detailData.trashBags * 50}L
                  </p>
                </div>
              </div>
              <DataDisplay
                label="자연재해 유무(최근 5일 이내)"
                value={detailData?.recentDisaster || "없음"}
              />
              <DataDisplay label="날씨" value={detailData?.weather || "없음"} />
              <div className="flex w-full space-x-2">
                <DataDisplay
                  className="w-1/2"
                  label="위도"
                  value={
                    coordLine.start.lat > 0
                      ? coordLine.start.lat.toFixed(6)
                      : "위치 정보 없음"
                  }
                />
                <DataDisplay
                  className="w-1/2"
                  label="경도"
                  value={
                    coordLine?.start?.lng > 0
                      ? coordLine.start.lng.toFixed(6)
                      : "위치 정보 없음"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              if (isNeeded) {
                navigate("/newWorks", { replace: true });
              } else {
                navigate("/workList", { replace: true });
              }
            }} // 이전 페이지로 이동
            className="w-24 h-12 bg-gray-300 text-gray-700 px-4 py-2 mr-4 rounded-md hover:bg-gray-400 transition"
          >
            목록
          </button>

          {isNeeded && (
            <button
              onClick={openApprovalModal} // 승인 클릭 시 승인 모달 열기
              className="w-24 h-12 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
            >
              배정
            </button>
          )}
        </div>
      </div>

      {/* 승인 모달 */}
      {isApprovalModalOpen && (
        <SubmitModal
          message={`‘${detailData.reportTime} ${detailData.beachName}’에\n 수거자를 배정하시겠습니까?`}
          confirmText="배정완료"
          cancelText="취소"
          onConfirm={handleApprove}
          onCancel={closeApprovalModal}
        />
      )}

      {/* 이미지 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white rounded-sm p-1">
            <div className="relative">
              <img
                src={
                  modalCalledFrom === "before"
                    ? beforeHDImgs[currentBeforeImageIndex]
                    : afterHDImgs[currentAfterImageIndex]
                }
                alt="큰 해안가 사진"
                className="max-w-full max-h-screen object-contain"
              />
              {/* X 버튼을 이미지 위에 배치 */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 w-7 h-7 bg-gray-800 bg-opacity-60 text-white rounded-full hover:bg-opacity-80"
              >
                X
              </button>
              <button
                onClick={() => {
                  modalCalledFrom === "before"
                    ? goToPreviousImage("before")
                    : goToPreviousImage("after");
                }}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={() => {
                  modalCalledFrom === "before"
                    ? goToNextImage("before")
                    : goToNextImage("after");
                }}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
};

// 데이터를 표시하는 공통 컴포넌트
const DataDisplay = ({ label, value, className }) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm mb-1 font-semibold">
        <img src={dot} alt="dot" className="w-1 me-2 inline" />
        {label}
      </label>
      <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
        {value}
      </p>
    </div>
  );
};

export default CleanReportPage;
