import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getImageByFileName } from "../../api/newWorksApi";
import { getCompletedWorksDetail } from "../../api/workListApi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import dot from "../../assets/icons/write/Circle.svg";
import SidebarLayout from "../../layouts/SidebarLayout";
import KakaoMap from "../../components/commons/KakaoMap";

const CollectReportPage = () => {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { reportId } = location.state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 이미지 모달 상태
  const [coord, setCoord] = useState({ lat: 0.0, lng: 0.0 });
  const [imgs, setImgs] = useState([]);
  const [hdImgs, setHdImgs] = useState([]);
  const [imageName, setImageName] = useState([]);

  const initData = {
    pickUpPlace: "",
    submitDateTime: "",
    submitterName: "",
    realTrashAmount: 0,
    mainTrashType: "",
  };
  const [detailData, setDetailData] = useState(initData);

  const fetchCollectDetail = async () => {
    try {
      const response = await getCompletedWorksDetail(reportId, "수거");
      // console.log("===========response: ", response);

      let formattedDate = "날짜 정보 없음";

      if (response.data.submitDateTime) {
        const date = new Date(response.data.submitDateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
      }

      if (response.data) {
        const newCoord = {
          lat: response.data.latitude,
          lng: response.data.longitude,
        };
        setCoord(newCoord);
      }

      setDetailData((prevData) => ({
        ...prevData,
        pickUpPlace: response.data.pickUpPlace,
        reportTime: formattedDate,
        submitterName: response.data.submitterName,
        realTrashAmount: response.data.realTrashAmount,
        mainTrashType: response.data.mainTrashType,
      }));

      if (
        response.data &&
        response.data.images &&
        response.data.images.length > 0
      ) {
        const fetchImages = async () => {
          try {
            await Promise.all(
              response.data.images.map(async (img) => {
                if (!imageName.includes(img)) {
                  setImageName((prev) => [...prev, img]);
                  const imageUrl = await getImageByFileName(img);
                  const hdImageUrl = await getImageByFileName(
                    img.replace(/^S_/, "")
                  );
                  setImgs((prev) => [...prev, imageUrl]);
                  setHdImgs((prev) => [...prev, hdImageUrl]);
                }
              })
            );
          } catch (error) {
            console.error("Error fetching images: ", error);
          }
        };
        fetchImages();
      }
    } catch (error) {
      console.error("데이터 검색 중 오류 방생: ", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  useEffect(() => {
    if (reportId) {
      fetchCollectDetail();
    }
  }, [reportId]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgs.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1
          className="text-xl font-bold mb-2 text-blue-700 inline-block cursor-pointer"
          onClick={() => navigate("/workList")}
        >
          작업 조회
        </h1>
        {/* 보고서 폼 */}
        <div className="bg-white rounded-lg shadow px-32 py-14">
          <h1 className="text-xl font-bold mb-6 text-black text-center">
            수거 보고서
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {/* 왼쪽 열: 해안가 사진과 지도 */}
            <div className="space-y-6 relative">
              <div>
                <h2 className="mb-2 text-center font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  집하지 사진
                </h2>
                <div className="relative">
                  <img
                    src={hdImgs[currentImageIndex]}
                    alt="집하지 사진"
                    className="w-full h-64 rounded-md object-cover cursor-pointer"
                    onClick={openModal} // 이미지 클릭 시 모달 열기
                  />
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
                <div className="flex justify-between w-full mt-3 gap-2 overflow-auto">
                  {imgs.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-1/3 h-24 rounded-md object-cover cursor-pointer ${
                        index === currentImageIndex
                          ? "border-2 border-blue-500"
                          : "border"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="mb-2 text-center font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  집하지 위치
                </h2>
                <div className="flex flex-col items-center bg-white rounded-lg shadow mb-8 w-full h-64">
                  <KakaoMap myCoords={coord} pickUpPlace={coord} />
                </div>
              </div>
            </div>

            {/* 오른쪽 열: 해안 정보 */}
            <div className="flex flex-col h-full space-y-10">
              <DataDisplay label="집하지명" value={detailData.pickUpPlace} />
              <DataDisplay label="수거 일자" value={detailData.reportTime} />
              <DataDisplay label="수거자" value={detailData.submitterName} />
              <div className="flex flex-col space-y-2">
                <label className="block text-gray-700 text-sm mb-1 font-semibold">
                  <img src={dot} alt="dot" className="w-1 me-2 inline" /> 쓰레기
                  수거량(50L 마대)
                </label>
                <div className="flex space-x-2">
                  <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-1/2">
                    {detailData.realTrashAmount}개
                  </p>
                  <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-1/2">
                    {detailData.realTrashAmount * 50}L
                  </p>
                </div>
              </div>
              <DataDisplay
                label="주요 쓰레기 종류"
                value={detailData.mainTrashType}
              />
              <div className="flex w-full space-x-2">
                <DataDisplay
                  className="w-1/2"
                  label="위도"
                  value={coord?.lat?.toFixed(6) || "위치 정보 없음"}
                />
                <DataDisplay
                  className="w-1/2"
                  label="경도"
                  value={coord?.lng.toFixed(6) || "위치 정보 없음"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() =>
              navigate("/workList", { state: { resetOld: false } })
            } // 이전 페이지로 이동
            className="w-24 h-12 bg-gray-300 text-gray-700 px-4 py-2 mr-4 rounded-md hover:bg-gray-400 transition"
          >
            목록
          </button>
        </div>
      </div>

      {/* 이미지 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white rounded-sm p-1">
            <div className="relative">
              <img
                src={hdImgs[currentImageIndex]}
                alt="큰 집하지 사진"
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
                onClick={goToPreviousImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={goToNextImage}
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

export default CollectReportPage;
