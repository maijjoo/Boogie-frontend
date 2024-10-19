import React, { useState, useRef, useEffect } from "react";

const AddressForm = () => {
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const detailAddressRef = useRef(null); // 상세 주소 입력에 포커스를 주기 위해 ref 사용

  const loadDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 변수
        let addr = "";

        // 주소 타입에 따라 도로명 혹은 지번 주소 설정
        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        // 상태 업데이트

        setAddress(addr);

        // 상세 주소로 포커스 이동
        if (detailAddressRef.current) {
          detailAddressRef.current.focus();
        }
      },
    }).open();
  };

  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트가 언마운트될 때 스크립트를 제거
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <button type="button" onClick={loadDaumPostcode}>
        검색
      </button>
      <br />
      <input
        type="text"
        id="sample6_address"
        placeholder="주소"
        value={address}
        readOnly
      />
      <br />
      <input
        type="text"
        id="sample6_detailAddress"
        placeholder="상세주소"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
        ref={detailAddressRef}
      />
    </div>
  );
};

export default AddressForm;
