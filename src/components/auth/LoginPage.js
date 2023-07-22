import { Login } from "./Login";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const { payload, token } = state;
  console.log(token);
  console.log(payload);
  useEffect(() => {
    // if (payload?.sub?.acl&&Object.values(payload.sub.acl).includes('admin')){console.log('admin')}
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="registerDiv">
      <h1>LOGIN IN</h1>

      <Login />
      <p>
        Or <Link to="/register">register</Link>
      </p>
    </div>
  );
}
