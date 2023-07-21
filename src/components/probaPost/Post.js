import { Link, useLocation } from "react-router-dom";
// ===========================================================
// мой гениальный хук для перехода на шаг назад
import { useGoBack as goBack } from "../../utils/goBack";
// ========================================================
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export function Post() {
  const { postId } = useParams();
  // console.log(useParams());
  console.log(useLocation());
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [postId]);

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <button>
            {" "}
            <Link to={`/posts/${postId}/edit`}>Edit post</Link>
          </button>
        </>
      )}
      Пост номер: {postId}
      {/* <Link to="/">На главную</Link> */}
      <button onClick={goBack()}> назад</button>
    </div>
  );
}
