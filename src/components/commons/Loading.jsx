// const Loading = <div>Loading...</div>; 일경우 재사용하기 어렵고 만약 props가 필요한 상황에선 이게 맞다고 한다.
// 근데 어차피 1초 내로 잠깐 보여졌다 사라질텐데... 이렇게 빼는게 맞나?

const Loading = () => <div>Loading...</div>;

export default Loading;