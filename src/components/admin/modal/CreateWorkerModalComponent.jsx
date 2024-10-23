import React, { useRef, useEffect, useState, Suspense } from "react";
import { useAuth } from "../../../hooks/useAuth";
import InsertWorkerModal from "../../modal/WebDetailModal";
import DateRangePicker from "../../commons/DateRangePicker";
import DatePickerComponent from "../../commons/DatePicker";
import searchIcon from "../../../assets/icons/write/Search.png";
import { createWorkerApi } from "../../../api/createWorkerApi";
import { createSingleWorker } from "../../../api/memberListApi";
const CreateWorkerModalComponent = ({ isOpen, onClose, adminDpt }) => {
  const { workPlace, department, id } = useAuth(); // 로그인한 관리자의 부서 정보
  const [name, setName] = useState(""); // 이름 상태
  const [phone, setPhone] = useState(""); // 연락처 상태
  const [birth, setBirth] = useState(null); // 생년월일 상태
  const [email, setEmail] = useState(""); // 이메일 상태
  const [vehicleCapacity, setVehicleCapacity] = useState(""); // 차량 적재량 상태
  const [address, setAddress] = useState(""); // 주소 상태
  const [detailAddress, setDetailAddress] = useState(""); // 상세주소 상태
  const [startDate, setStartDate] = useState(); // 업무 시작일 상태
  const [endDate, setEndDate] = useState(); // 업무 종료일 상태
  const detailAddressRef = useRef(null); // 상세 주소 입력에 포커스를 주기 위해 ref 사용
  const [isEditable, setIsEditable] = useState(true); // 수정 가능 상태 관리
  // 연락처 입력 핸들러
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, ""); // 숫자 외의 모든 문자 제거
    if (input.length <= 3) {
      setPhone(input); // 3자리 이하일 때는 그대로
    } else if (input.length <= 7) {
      setPhone(`${input.slice(0, 3)}-${input.slice(3)}`); // 3자리 이후부터 하이픈 추가
    } else if (input.length <= 11) {
      setPhone(`${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`); // 3-4-4 형식으로 하이픈 추가
    } else {
      setPhone(
        `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`
      ); // 3-4-4 형식으로 잘라냄
    }
  };

  // 주소 검색 API
  const loadkakaoAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        setAddress(addr);
        if (detailAddressRef.current) {
          detailAddressRef.current.focus();
        }
      },
    }).open();
  };

  // [등록하기] 버튼 클릭했을 때 호출하는 함수
  const handleConfirm = async () => {
    try {
      // 입력된 데이터를 API에 전달
      await createSingleWorker(
        id,
        name,
        phone,
        birth,
        email,
        vehicleCapacity,
        address,
        detailAddress,
        startDate,
        endDate
      );

      console.log("등록 완료!");
      onClose("success"); // 모달 닫기
    } catch (error) {
      console.error("회원 등록 중 오류 발생:", error);
      alert("회원 등록 중 오류가 발생했습니다.");
    }
  };

  // 모달이 열릴 때 모든 값 초기화
  useEffect(() => {
    if (isOpen) {
      setName("");
      setPhone("");
      setBirth(null);
      setEmail("");
      setVehicleCapacity(0.0);
      setAddress("");
      setDetailAddress("");
      setStartDate(null);
      setEndDate(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <InsertWorkerModal
      title="회원 등록"
      confirmText="등록하기"
      cancelText="취소"
      onConfirm={handleConfirm}
      onCancel={onClose}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">이름</label>
          <input
            type="text"
            className="w-56 border-b border-b-gray-300 text-right"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">연락처</label>
          <input
            type="text"
            className="w-56 border-b border-b-gray-300 text-right"
            value={phone}
            onChange={handlePhoneChange} // 정규식 적용한 핸들러
            maxLength={13} // 최대 입력 길이 설정
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">생년월일</label>
          <DatePickerComponent selected={birth} onChange={setBirth} />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">이메일</label>
          <input
            type="email"
            className="w-56 border-b border-b-gray-300 text-right"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">차량 적재량(t)</label>
          <input
            type="number"
            className="w-56 border-b border-b-gray-300 text-right"
            value={vehicleCapacity}
            onChange={(e) =>
              setVehicleCapacity(e.target.value.replace(/[^0-9.]/g, ""))
            }
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2">주소</label>
          <div className="flex justify-between ">
            <input
              type="text"
              className="w-10/12 mb-2 border border-gray-300 text-gray-600 rounded-sm p-2"
              placeholder="주소"
              value={address}
              readOnly
            />
            <button
              type="button"
              onClick={loadkakaoAddress}
              className="w-10 h-10 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition flex items-center justify-center"
            >
              <img src={searchIcon} alt="searchIcon" className="w-6 h-6" />
            </button>
          </div>
          <input
            type="text"
            className="w-full border border-gray-300 text-gray-600 rounded-sm p-2"
            placeholder="상세주소"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            ref={detailAddressRef}
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">소속</label>
          <input
            type="text"
            className="w-3/5 border-b border-b-gray-300 text-right"
            value={adminDpt}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center ">
          <label className="font-semibold">업무기간</label>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            className="border-b border-b-gray-300"
            isEditable={isEditable} // 클릭 가능하게 설정
          />
        </div>
      </div>
    </InsertWorkerModal>
  );
};

export default CreateWorkerModalComponent;
