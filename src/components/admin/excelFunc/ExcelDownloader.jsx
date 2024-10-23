import React from "react";
import XLSX from "xlsx-js-style";
import excelDown from "../../../assets/icons/adminMode/downloadB.png";

const ExcelDownloader = ({ data = null, tab = null }) => {
  const headerStyle = {
    fill: {
      fgColor: { rgb: "F7B4AE" }, // 배경색 연한 빨강 (#F7B4AE)
      patternType: "solid",
    },
    font: {
      bold: true, // 글자 볼드 처리
      color: { rgb: "000000" }, // 글자색 검정
    },
    alignment: {
      horizontal: "center", // 가로 가운데 정렬
      vertical: "center", // 세로 가운데 정렬
    },
    border: {
      top: { style: "thin", color: { rgb: "000000" } }, // 상단 테두리
      bottom: { style: "thin", color: { rgb: "000000" } }, // 하단 테두리
      left: { style: "thin", color: { rgb: "000000" } }, // 좌측 테두리
      right: { style: "thin", color: { rgb: "000000" } }, // 우측 테두리
    },
  };

  const noColorStyle = {
    font: {
      bold: true, // 글자 볼드 처리
      color: { rgb: "000000" }, // 글자색 검정
    },
    alignment: {
      horizontal: "center", // 가로 가운데 정렬
      vertical: "center", // 세로 가운데 정렬
    },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  };

  const headers =
    tab && tab === "worker"
      ? [
          "이름",
          "연락처 (ex. 010-1234-5678)",
          "생년월일 (ex. 2000-01-01)",
          "이메일 (ex. bada123@gmail.com)",
          "수거 차량 적재량 (ex. 1.5 없을 시 0)",
          "주소",
          "상세 주소",
          "시작일 (ex. 2024-01-01)",
          "종료일 (ex. 2024-06-01)",
        ]
      : [
          "이름",
          "개인 연락처 (ex. 010-1234-5678)",
          "이메일 (ex. bada123@gmail.com)",
          "근무처 주소(선택)",
          "근무처 상세 주소(선택)",
          "시",
          "군/구",
          "부서",
          "직급",
          "연락처 (ex. 051-000-0000)",
        ];

  const getByteLength = (str) => {
    let byte = 0;
    for (let i = 0; i < str.length; i++) {
      if (escape(str.charAt(i)).length > 4) {
        byte += 2;
      } else {
        byte += 1;
      }
    }
    return byte;
  };

  // 열 너비 계산
  const calculateColumnWidth = (header, columnData = []) => {
    // 헤더 길이 (바이트 단위)
    const headerLength = getByteLength(header);

    // 데이터 중 가장 긴 내용의 길이
    const maxDataLength = columnData.reduce((max, item) => {
      const length = getByteLength(String(item));
      return length > max ? length : max;
    }, 0);

    // 헤더와 데이터 중 더 긴 길이 선택 (최소 8자, 최대 50자)
    const width = Math.max(
      Math.min(Math.max(headerLength, maxDataLength), 50),
      8
    );

    // Excel 열 너비로 변환 (약 1자 = 1.2)
    return width * 1.2;
  };

  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();

    const wsData = [headers];

    if (data && data.length > 0) {
      wsData.push(...data);
    }

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const wscols = headers.map((header, index) => {
      const columnData = data ? data.map((row) => row[index]) : [];
      return { wch: calculateColumnWidth(header, columnData) };
    });
    ws["!cols"] = wscols;

    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      if (tab === "admin" && (index === 3 || index === 4)) {
        ws[cellAddress].s = noColorStyle;
      } else {
        ws[cellAddress].s = headerStyle;
      }
    });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(
      wb,
      `${tab === "admin" ? "관리자" : "작업자"} 일괄 등록 양식.xlsx`
    );
  };

  return (
    <p
      className="text-blue-700 hover:text-blue-900 text-base cursor-pointer border-2 border-blue-700 hover:border-blue-900 flex rounded-lg p-3 w-52 items-center gap-1"
      onClick={downloadExcel}
    >
      <img className="w-5 h-5 me-1" src={excelDown} alt="엑셀 양식 다운로드" />
      엑셀 양식 다운로드
    </p>
  );
};

export default ExcelDownloader;
