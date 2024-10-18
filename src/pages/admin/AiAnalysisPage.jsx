import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useResetConditions } from "../../hooks/useResetConditions";
import { useNavigate } from "react-router-dom";

function AiAnalysisPage(props) {
  useResetConditions("all");
  const navigate = useNavigate();
  const { isLoggedIn, role } = useAuth();

  useEffect(() => {
    if (!isLoggedIn || role === "WORKER") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, role, navigate]);

  useEffect(() => {
    const move = setTimeout(() => {
      navigate("/adminMain", { replace: true });
    }, 2000);

    return () => {
      clearTimeout(move);
    };
  });

  return <div>개발중...</div>;
}

export default AiAnalysisPage;
