import { localStoredReducer } from "../../store/localStoredReduser";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignUp } from "./SignUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const { payload, token } = state;
  // console.log(token);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="registerDiv">
      <h1>Регистрация</h1>
      <SignUp />
      <p>
        У Вас уже есть аккаунт? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};
