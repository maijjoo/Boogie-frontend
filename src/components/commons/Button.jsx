// 버튼 컴포넌트
// <Button onClick={}>{chidren}</Button>
// tailwind 는 그냥 쓸때처럼 className="" 으로 넘김
// 버튼 색깔은 color="blue" 로 넘기고
// 추가하고 싶은 색상은 아래 colorClasses 에 추가
// 오프닝태그 내용은 자동으로 적용
// 나머지 속성들은 onClick={() => ...} 등등 적은대로 적용

const Button = ({ className, color, children, ...props }) => {
  const colorClasses = {
    blue: "bg-blue-700 text-white border  hover:bg-blue-900",
    emptyBlue:
      "bg-white text-blue-700 border border-blue-700 hover:bg-gray-200",
    red: "bg-red-500 text-white hover:bg-red-600",
    green: "bg-green-500 text-white hover:bg-green-600",
    white: "bg-white text-blue-700 hover:bg-blue-200 border border-blue-700",
    gray: "bg-white text-gray-400 border border-gray-400",
    // 필요한 색상 추가
  };

  return (
    <button {...props} className={`${colorClasses[color]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
