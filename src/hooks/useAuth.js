import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";

export const useAuth = () => {
  const memberInfo = useSelector((state) => state);
  const dispatch = useDispatch();

  const isLoggedIn = !!memberInfo?.email;

  const role = memberInfo.roleNames[0] || "Guest";

  const handleLogout = () => {
    dispatch(logout());
    // 쿠키도 삭제해야 할 경우c
    // removeCookie("member");
  };

  return {
    isLoggedIn,
    memberInfo,
    role,
    logout: handleLogout,
  };
};
