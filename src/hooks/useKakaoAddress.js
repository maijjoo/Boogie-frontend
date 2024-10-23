import React, { useState, useEffect } from "react";

// Daum Postcode API를 사용하기 위해 window 객체에 접근
const { daum } = window;

const useKakaoAddress = (onAddressSelected) => {
  const [postcode, setPostcode] = useState("");
  const [kAddress, setKAddress] = useState("");
  const [kDetailAddress, setKDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false); // 스크립트 로드 여부 상태 추가

  useEffect(() => {
    // Daum 우편번호 스크립트가 이미 로드되었는지 확인
    const existingScript = document.querySelector(
      'script[src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
    );

    if (!existingScript) {
      // 스크립트가 없으면 로드
      const script = document.createElement("script");
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => setIsScriptLoaded(true); // 로드 완료 후 상태 업데이트
      document.body.appendChild(script);
    } else {
      // 이미 스크립트가 로드되었으면 상태를 true로 설정
      setIsScriptLoaded(true);
    }
  }, []);

  const handleComplete = (data) => {
    let addr = ""; // 주소 변수
    let extraAddr = ""; // 참고항목 변수

    // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
    if (data.userSelectedType === "R") {
      // 도로명 주소 선택
      addr = data.roadAddress;
    } else {
      // 지번 주소 선택
      addr = data.jibunAddress;
    }

    // 도로명 주소일 경우 참고항목을 조합
    if (data.userSelectedType === "R") {
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      if (extraAddr !== "") {
        extraAddr = " (" + extraAddr + ")";
      }
    }

    // 상태값 업데이트
    setPostcode(data.zonecode);
    setKAddress(addr);
    setExtraAddress(extraAddr);
    // 상세주소 입력 필드로 포커스 이동
    const detailAddressInput = document.getElementsByName("addressDetail")[0];
    if (detailAddressInput) {
      detailAddressInput.focus();
    }

    if (onAddressSelected) {
      onAddressSelected && onAddressSelected(addr, extraAddr);
    }
  };
  const execDaumPostcode = () => {
    if (!isScriptLoaded) {
      alert("Daum 우편번호 서비스 로드 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  return {
    postcode,
    kAddress,
    kDetailAddress,
    extraAddress,
    setKDetailAddress,
    execDaumPostcode,
  };
};

export default useKakaoAddress;
