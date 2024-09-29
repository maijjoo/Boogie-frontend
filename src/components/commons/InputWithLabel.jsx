// label + input 컴포넌트
// 라벨 이름은 children 으로 넘김
// 테일윈드는 className 으로 넘김
// 색상, 테두리는 미리 적용해놨음
// 나머지는 적은대로 넘어옴

// 라벨-인풋 한줄로 출력할지
// 라벨
// 인풋 두줄로 출력할지는
// <div className="여기서 처리해줌"><InputWithLabel /></div>
import React, { forwardRef } from "react";

const Input = forwardRef(function Input(
  { className, children, ...props },
  ref
) {
  return (
    <>
      <label className="mb-2">{children}</label>
      <input
        className={`border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 ${className}`}
        ref={ref}
        {...props}
      />
    </>
  );
});

export default Input;
