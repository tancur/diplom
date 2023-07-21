import { NavLink, useParams } from "react-router-dom";
// мой гениальный хук для перехода на шаг назад
import { useGoBack as goBack } from "../../utils/goBack";
// =========================================================

export function EditPost() {
  const { postId } = useParams();
  return (
    <div>
      Edit post number {postId}
      {/* <NavLink to="/posts/:postId">К отдельному посту</NavLink> */}
      <button onClick={goBack()}> назад</button>
    </div>
  );
}
