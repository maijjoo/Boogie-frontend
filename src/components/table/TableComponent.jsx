import React, { useState } from "react";

const TableComponent = ({ headers, rows }) => {
  // 전체 체크박스 상태를 관리하는 state
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState(
    new Array(rows.length).fill(false) // 모든 row의 체크 상태를 false로 초기화
  );

  // 전체 체크박스 클릭 시 실행되는 핸들러
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setCheckedRows(new Array(rows.length).fill(checked)); // 모든 row의 체크 상태를 업데이트
  };

  // 개별 row의 체크박스 클릭 시 실행되는 핸들러
  const handleRowCheck = (index) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);

    // 모든 row가 체크되었는지 확인하여 전체 체크박스 상태도 업데이트
    const allChecked = updatedCheckedRows.every(Boolean);
    setIsAllChecked(allChecked);
  };

  return (
    <table className="table-fixed w-full text-left bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200 border-b w-full">
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-4 py-2 border text-center"
              style={{ width: header.width }}
            >
              {header.isCheckbox ? (
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-blue-600"
                    checked={isAllChecked}
                    onChange={handleAllCheck}
                  />
                </div>
              ) : (
                header.label
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-4 py-2 text-center"
                style={{ width: headers[cellIndex].width }}
              >
                {headers[cellIndex].isCheckbox ? (
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-6 w-6 text-blue-600"
                      checked={checkedRows[rowIndex]} // 해당 row의 체크 상태를 적용
                      onChange={() => handleRowCheck(rowIndex)} // 개별 체크박스 클릭 핸들러
                    />
                  </div>
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
