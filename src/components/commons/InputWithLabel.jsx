// label + input 컴포넌트
// 라벨 이름은 children 으로 넘김
// inputChild 로 input 에 요소 넣을수 있음
// input 태그 css 는 className 로 넘김
// label 태그 css 는 labelClass 로 넘김
// 색상, 테두리는 미리 적용해놨음
// 나머지는 적은대로 넘어옴

// 라벨-인풋 한줄로 출력할지
// 라벨
// 인풋 두줄로 출력할지는
// <div className="여기서 처리해줌"><InputWithLabel /></div>
import React, { forwardRef } from "react";

const Input = forwardRef(function Input(
  { labelClass, className, children, inputChild, ...props },
  ref
) {
  return (
    <>
      <label className={`${labelClass}`}>{children}</label>
      {inputChild ? (
        <div className="flex items-center justify-between">
          <input
            className={`p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 ${className}`}
            ref={ref}
            {...props}
          />
          <div className="ml-2">{inputChild}</div>
        </div>
      ) : (
        <input
          className={`p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 ${className}`}
          ref={ref}
          {...props}
        />
      )}
    </>
  );
});

export default Input;
