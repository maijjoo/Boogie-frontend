import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useResetConditions } from "../../hooks/useResetConditions";

const AdminMainPage = () => {
  useResetConditions("all");

  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || role === "WORKER") {
      navigate("/", { replace: true });
    } else {
      navigate("/mainTrashDistribution", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);
  return <SidebarLayout />;
};

export default AdminMainPage;
