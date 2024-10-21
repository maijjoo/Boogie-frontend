import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";

export const useAuth = () => {
  const memberInfo = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const isLoggedIn = !!memberInfo?.username;

  const role = memberInfo?.roleNames?.[0] || "Guest";

  const isDriver = !!memberInfo?.vehicleCapacity;

  const username = memberInfo?.username || "";

  const workCity = memberInfo?.workCity || "";

  const workPlace = memberInfo?.workPlace || "";

  const department = memberInfo?.department || "";

  const name = memberInfo?.name || "";

  const id = memberInfo?.id || "";

  const managerId = memberInfo?.managerId || null;

  const phone = memberInfo?.phone || "";

  const nameWithPhone = name + " " + phone.slice(-4);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    memberInfo,
    role,
    username,
    isDriver,
    logout: handleLogout,
    workCity,
    workPlace,
    department,
    name,
    managerId,
    id,
    phone,
    nameWithPhone,
  };
};
