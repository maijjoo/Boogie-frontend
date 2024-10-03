import Sidebar from "../components/menus/Sidebar";

// 이거 빨간거 왜 생기는거? 작동은 잘 되는데
const SidebarLayout = ({ children }) => {
  console.log(children);

  return <Sidebar />;
};

export default SidebarLayout;
