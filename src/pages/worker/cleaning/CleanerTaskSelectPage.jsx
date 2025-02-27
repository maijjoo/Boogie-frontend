import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo_tr.png";
import wave from "../../../assets/images/wave.jpg";
import Button from "../../../components/commons/Button";
import clean from "../../../assets/icons/workerMode/Housekeeping.svg";
import pickup from "../../../assets/icons/workerMode/Trash Pile.svg";

const CleanerTaskSelectPage = () => {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const result = location?.state?.success || "default";

  const [successToast, setSuccessToast] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = () => {
    setSuccessToast(true);
    setIsToastVisible(true);

    // 페이드 아웃 시작
    setTimeout(() => {
      setIsToastVisible(false);
    }, 1500);

    // 요소 제거
    setTimeout(() => {
      setSuccessToast(false);
    }, 2000);
  };

  useEffect(() => {
    if (result !== "default") {
      showToast();
    }
  }, [result]);

  useEffect(() => {
    if (!isLoggedIn || role !== "WORKER") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate, role]);

  return (
    <div className="w-full h-dvh flex flex-col items-center">
      <div className="flex items-center mt-3">
        <img className="w-52 xl:w-64" src={logo} alt="logo" />
      </div>

      <div className="flex items-center mt-9">
        <p className=" font-bold">이용하실 서비스를 선택해 주세요</p>
      </div>

      <div className="w-full p-6 flex flex-col items-center mt-10">
        <Button
          className="w-full xl:w-1/5 p-2 m-2 flex items-center justify-center md:text-base rounded-md border-2 shadow-md"
          color="white"
          onClick={() => navigate("/cleaningMain")}
        >
          <img className="w-8 xl:w-8 me-1" src={clean} alt="clean" />
          <p className="font-bold ms-1">청소 보고서</p>
        </Button>

        <Button
          className="w-full xl:w-1/5 p-2 m-2 flex items-center justify-center md:text-base rounded-md border-2 shadow-md"
          color="white"
          onClick={() => navigate("/pickUpMain")}
        >
          <img className="w-8 xl:w-8 me-1" src={pickup} alt="pickup" />
          <p className="font-bold ms-1">집하지 등록</p>
        </Button>
      </div>

      {successToast && (
        <div className="w-full p-6">
          <div className="flex justify-center relative">
            <div
              className={`absolute top-5 left-1/2 w-full transform -translate-x-1/2 bg-blue-200 py-3 rounded-lg shadow-lg transition-all duration-500 ${
                isToastVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <p className="text-blue-800 text-center font-semibold text-lg">
                {result === "cleaning" ? "청소 보고서 제출" : "집하지 등록"}{" "}
                완료
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-end mt-auto w-full">
        <img className="w-full" src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default CleanerTaskSelectPage;
