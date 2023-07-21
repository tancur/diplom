import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// мой гениальный хук для перехода на шаг назад
import { useGoBack as goBack } from "../../utils/goBack";
export function NotFoundPage() {
  // const navigate = useNavigate();
  // const goBack = () => navigate(-1);
  return (
    <div>
      Страница не найдена.
      <button onClick={goBack()}> назад</button>
    </div>
  );
}
