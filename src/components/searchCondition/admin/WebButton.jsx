// 버튼 컴포넌트
// <Button onClick={}>{chidren}</Button>
// tailwind 는 그냥 쓸때처럼 className="" 으로 넘김
// 버튼 색깔은 color="blue" 로 넘기고
// 추가하고 싶은 색상은 아래 colorClasses 에 추가
// 오프닝태그 내용은 자동으로 적용
// 나머지 속성들은 onClick={() => ...} 등등 적은대로 적용

const WebButton = ({ className, color, size, children, ...props }) => {
  // 색상별 클래스 정의
  const colorClasses = {
    blue: "bg-blue-700 text-white hover:bg-blue-800",
    emptyBlue:
      "bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white transition",
    red: "bg-red-500 text-white hover:bg-red-600",
    green: "text-white bg-emerald-600 hover:bg-emerald-700 transition",
    white: "bg-white text-blue-700 hover:bg-blue-200 border border-blue-700",
    gray: "text-white bg-slate-400 text-gray-700 hover:bg-slate-500 transition",
  };

  // 크기별 클래스 정의
  const sizeClasses = {
    small: "w-20 h-8 px-2 py-1 rounded-full",
    medium: "w-30 h-12 px-4 py-2 rounded-full",
    large: "w-36 h-12 px-6 py-3 rounded-full",
  };

  return (
    <button
      {...props}
      className={`${colorClasses[color]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default WebButton;
