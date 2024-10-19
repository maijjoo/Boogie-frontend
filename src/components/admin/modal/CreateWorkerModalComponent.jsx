import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import InsertWorkerModal from "../../modal/WebDetailModal";
import DateRangePicker from "../../commons/DateRangePicker";
import DatePickerComponent from "../../commons/DatePicker";
import searchIcon from "../../../assets/icons/write/Search.png";
// import createWorkerApi from "../../../api/createWorkerApi";

const CreateWorkerModalComponent = ({ isOpen, onClose }) => {
  const { workPlace, department } = useAuth(); // 로그인한 관리자의 부서 정보
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const detailAddressRef = useRef(null); // 상세 주소 입력에 포커스를 주기 위해 ref 사용
  const [startDate, setStartDate] = useState(); // 업무 시작일
  const [endDate, setEndDate] = useState(); // 업무 종료일
  const [isEditable, setIsEditable] = useState(false); // 수정 가능 상태 관리
  const dateRangePickerRef = useRef(null); // DateRangePicker에 포커스를 주기 위한 ref

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

  // [등록하기] 버튼 클릭했을 때
  const handleConfirm = async () => {
    try {
      // updateWorkPeriodApi 함수 호출 시 startDate와 endDate를 그대로 전달
      await createWorkerApi(selectedMember.id, startDate, endDate);

      console.log("업무기간 수정 완료:", startDate, endDate);

      // 수정 완료 후 상태를 다시 읽기 전용으로 변경
      setIsEditable(false);
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("업무기간 수정 중 오류 발생:", error);
      alert("업무기간 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때마다 주소 초기화
      setAddress("");
      setDetailAddress("");
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
            className="w-56 border-b border-b-gray-300  text-right"
          ></input>
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">연락처</label>
          <input
            type="text"
            className="w-56 border-b border-b-gray-300  text-right"
            placeholder="010-1234-5678"
          ></input>
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">생년월일</label>
          <DatePickerComponent />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">이메일</label>
          <input
            type="email"
            className="w-56 border-b border-b-gray-300   text-right"
          ></input>
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">차량 적재량(t)</label>
          <input
            type="text"
            className="w-56 border-b border-b-gray-300 text-right"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // 숫자와 . 외의 모든 문자 제거
            }}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="font-semibold mb-2">주소</label>
          <div className="flex justify-between ">
            <input
              type="text"
              className="w-10/12 mb-2 border border-gray-300 text-gray-600 rounded-sm p-2 "
              id="sample6_address"
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
            id="sample6_detailAddress"
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
            className="w-3/5 border-b border-b-gray-300    text-right focus:outline-none focus:ring-0 "
            value={`${workPlace} ${department}과`}
            readOnly
          ></input>
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
            isEditable={isEditable} // 항상 활성화되어 있도록 true로 설정
            className="border-b border-b-gray-300"
            ref={dateRangePickerRef}
          />
        </div>
      </div>
    </InsertWorkerModal>
  );
};

export default CreateWorkerModalComponent;
