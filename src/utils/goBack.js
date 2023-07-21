import { useNavigate } from "react-router-dom";
export function useGoBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}

// const goBack = () => navigate(-1);
