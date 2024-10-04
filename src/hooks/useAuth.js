import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";

export const useAuth = () => {
  const memberInfo = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const isLoggedIn = !!memberInfo?.username;

  const role = memberInfo?.role || "Guest";

  const isDriver = !!memberInfo?.vehicleCapacity;

  const username = memberInfo?.username;

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    memberInfo: memberInfo || {},
    role,
    username,
    isDriver,
    logout: handleLogout,
  };
};
