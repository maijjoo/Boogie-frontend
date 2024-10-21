import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import InsertWorkerModal from "../../modal/WebDetailModal";
import { createWorkerApi } from "../../../api/createWorkerApi";

const CreateAdminModalComponent = ({ isOpen, onClose }) => {
  const { workCity, id } = useAuth(); // 로그인한 관리자의 부서 정보
  const [name, setName] = useState(""); // 이름 상태
  const [contact, setContact] = useState(""); // 연락처 상태
  const [email, setEmail] = useState(""); // 이메일 상태
  const [workPlace, setWorkPlace] = useState(""); // 근무처 상태
  const [department, setDepartment] = useState(""); // 부서 상태
  const [position, setPositon] = useState(""); // 직급 상태
  const [phone, setPhone] = useState(""); // 개인번호 상태
  const [isEditable, setIsEditable] = useState(true); // 수정 가능 상태 관리
  // 연락처 입력 핸들러
  const handleContactChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, ""); // 숫자 외의 모든 문자 제거
    if (input.length <= 3) {
      setContact(input); // 3자리 이하일 때는 그대로
    } else if (input.length <= 7) {
      setContact(`${input.slice(0, 3)}-${input.slice(3)}`); // 3자리 이후부터 하이픈 추가
    } else if (input.length <= 11) {
      setContact(`${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`); // 3-4-4 형식으로 하이픈 추가
    } else {
      setContact(
        `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`
      ); // 3-4-4 형식으로 잘라냄
    }
  };

  // [등록하기] 버튼 클릭했을 때 호출하는 함수
  const handleConfirm = async () => {
    try {
      // 입력된 데이터를 API에 전달
      await createWorkerApi(id, name, contact, email, workPlace, department);

      console.log("등록 완료!");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("회원 등록 중 오류 발생:", error);
      alert("회원 등록 중 오류가 발생했습니다.");
    }
  };

  // 모달이 열릴 때 모든 값 초기화
  useEffect(() => {
    if (isOpen) {
      setName("");
      setContact("");
      setEmail("");
      setWorkPlace("");
      setDepartment("");
      setPositon("");
      setPhone("");
      setIsEditable("");
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
          <label className="font-semibold">근무지 연락처</label>
          <input
            type="text"
            className="w-56 border-b border-b-gray-300 text-right"
            value={contact}
            onChange={handleContactChange} // 정규식 적용한 핸들러
            maxLength={13} // 최대 입력 길이 설정
          />
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">개인 연락처</label>
          <input
            type="text"
            className="w-56 border-b border-b-gray-300 text-right"
            value={phone}
            onChange={handleContactChange} // 정규식 적용한 핸들러
            maxLength={13} // 최대 입력 길이 설정
          />
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
          <label className="font-semibold">근무처</label>
          <input
            type="text"
            className="w-2/6  text-center"
            value={workCity}
            readOnly
          />
          <select
            className="w-2/6 border-b border-b-gray-300 text-center"
            value={workPlace}
          >
            <option>사하구</option>
          </select>
        </div>
        <div className="flex justify-between items-center mb-3 ">
          <label className="font-semibold">부서</label>
          <input
            type="text"
            className="w-2/6 border-b border-b-gray-300 text-right"
            value={department}
            placeholder="부서"
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            type="text"
            className="w-2/6 border-b border-b-gray-300 text-right"
            value={position}
            placeholder="직급"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </InsertWorkerModal>
  );
};

export default CreateAdminModalComponent;
