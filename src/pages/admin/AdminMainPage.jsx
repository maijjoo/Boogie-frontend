import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import SidebarLayout from "../../layouts/SidebarLayout";

const AdminMainPage = () => {
  const { isLoggedIn, memberInfo, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    } else {
      navigate("/mainTrashDistribution");
    }
  }, [isLoggedIn, role, navigate]);

  useEffect(() => {
    console.log("Current member info: ", memberInfo);
  }, [memberInfo]);
  return <SidebarLayout />;
};

export default AdminMainPage;
