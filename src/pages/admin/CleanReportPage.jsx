import { useEffect, useState } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import dot from "../../assets/icons/write/Circle.svg";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import KakaoMap from "../../components/commons/KakaoMap";

const CleanReportPage = () => {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 이미지 모달 상태
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false); // 승인 모달 상태
  const [myCoords, setMyCoords] = useState({ lat: 34.577961, lng: 127.736672 });
  const reportData = {
    images: [
      "https://www.ilovesea.or.kr/images/newsletter/201810/contents_special_05.jpg",
      "https://www.ilovesea.or.kr/images/newsletter/201810/contents_special_06.jpg",
      "https://www.ilovesea.or.kr/images/newsletter/201810/contents_special_07.jpg",
    ],
    beachName: "해운대",
    beachLength: 250,
    reportTime: "2024/09/20 14:30",
    researchers: "김철수, 이현서, 강지수, 조민형",

    trashBags: 3,
    totalVolume: "150L",
    recentDisaster: "집중호우",
    weather: "28°C",
    latitude: "34.577961",
    longitude: "127.736672",
    mapImage: "https://example.com/sample-map.jpg",
  };

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  // 이미지 이동 함수
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? reportData.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === reportData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 모달 열기/닫기 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openApprovalModal = () => setIsApprovalModalOpen(true);
  const closeApprovalModal = () => setIsApprovalModalOpen(false);

  const handleApprove = () => {
    setIsApprovalModalOpen(false);
    navigate(-1); // 승인 시 목록으로 이동
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <Link to={"/newWorks"}>
          <h1 className="text-xl font-bold mb-2 text-blue-700">New 작업</h1>
        </Link>

        {/* 보고서 폼 */}
        <div className="bg-white rounded-lg shadow px-32 py-14">
          <h1 className="text-xl font-bold mb-6 text-black text-center">
            청소 보고서
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {/* 왼쪽 열: 해안가 사진과 지도 */}
            <div className="space-y-6 relative">
              <div>
                <h2 className="mb-2 text-center text-lg font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  청소 전 해안가 사진
                </h2>
                <div className="relative">
                  <img
                    src={reportData.images[currentImageIndex]}
                    alt="해안가 오염도 사진"
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
                <div className="flex justify-between w-full mt-3 gap-2">
                  {reportData.images.map((image, index) => (
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
                <h2 className="mb-2 text-center text-lg font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  청소 후 해안가 사진
                </h2>
                <div className="relative">
                  <img
                    src={reportData.images[currentImageIndex]}
                    alt="해안가 오염도 사진"
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
                <div className="flex justify-between w-full mt-3 gap-2">
                  {reportData.images.map((image, index) => (
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
                <h2 className=" text-center text-lg font-semibold bg-gray-100 border py-1 border-gray-300 rounded-sm">
                  청소 위치
                </h2>
                <div className="flex flex-col items-center border border-gray-200 rounded-b-lg  mb-8 w-full h-64">
                  <KakaoMap myCoords={myCoords} />
                </div>
              </div>
            </div>

            {/* 오른쪽 열: 해안 정보 */}
            <div className="flex flex-col  h-full space-y-10">
              <DataDisplay label="해안명" value={reportData.beachName} />
              <DataDisplay
                label="해안 길이(m)"
                value={`${reportData.beachLength}`}
              />
              <DataDisplay label="조사 일자" value={reportData.reportTime} />
              <DataDisplay label="조사 인원" value={reportData.researchers} />
              <div className="flex flex-col space-y-2">
                <label className="block text-gray-700 text-lg mb-1 font-semibold  ">
                  <img src={dot} alt="dot" className="w-1 me-2 inline " /> 실제
                  쓰레기양(50L 마대)
                </label>
                <div className="flex space-x-2">
                  <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-1/2">
                    {reportData.trashBags}개
                  </p>
                  <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-1/2">
                    {reportData.totalVolume}
                  </p>
                </div>
              </div>
              <DataDisplay
                label="자연재해 유무(최근 5일 이내)"
                value={reportData.recentDisaster}
              />
              <DataDisplay label="날씨" value={reportData.weather} />
              <div className="flex w-full space-x-2">
                <DataDisplay
                  className="w-1/2"
                  label="위도"
                  value={reportData.latitude}
                />
                <DataDisplay
                  className="w-1/2"
                  label="경도"
                  value={reportData.longitude}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)} // 이전 페이지로 이동
            className="w-24 h-12 bg-gray-300 text-gray-700 px-4 py-2 mr-4 rounded-md hover:bg-gray-400 transition"
          >
            목록
          </button>
          <button
            onClick={openApprovalModal} // 승인 클릭 시 승인 모달 열기
            className="w-24 h-12 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            배정
          </button>
        </div>
      </div>

      {/* 승인 모달 */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-center mb-4 font-bold">
              ‘{reportData.reportTime} {reportData.beachName}’에 수거자를
              배정하셨습니까?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeApprovalModal}
                className="w-24 h-10 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                취소
              </button>
              <button
                onClick={handleApprove}
                className="w-24 h-10 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
              >
                배정완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 이미지 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white rounded-sm p-1">
            <div className="relative">
              <img
                src={reportData.images[currentImageIndex]}
                alt="큰 해안가 사진"
                className="max-w-full max-h-screen object-contain"
              />
              {/* X 버튼을 이미지 위에 배치 */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 w-7 h-7 bg-gray-800 bg-opacity-60 text-white  rounded-full hover:bg-opacity-80"
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
      <label className="block text-gray-700  mb-1 font-semibold text-lg">
        <img src={dot} alt="dot" className="w-1 me-2 inline" />
        {label}
      </label>
      <p className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-lg">
        {value}
      </p>
    </div>
  );
};

export default CleanReportPage;
