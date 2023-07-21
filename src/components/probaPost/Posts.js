import { Link, NavLink, useLocation } from "react-router-dom";
// мой гениальный хук для перехода на шаг назад
import { useGoBack as goBack } from "../../utils/goBack";
// =========================================================
import { useState, useEffect } from "react";
export function Posts() {
  console.log(useLocation());
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  // console.log({ posts });
  return (
    <div>
      {posts.map((i) => (
        <NavLink key={i.id} to={`/posts/${i.id}`}>
          <li>{i.title}</li>
        </NavLink>
      ))}

      {/* <NavLink to="/posts/:postId">К отдельному посту</NavLink> */}

      <button onClick={goBack()}> назад</button>
    </div>
  );
}
