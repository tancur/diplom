import { useDispatch } from "react-redux";

import { Form } from "./Form";
import { actionFullLogin } from "../../store/authReducer";

export const Login = () => {
  // console.log(payload);

  const dispatch = useDispatch();

  const handleLogin = (login, password) => {
    dispatch(actionFullLogin(login, password));
  };

  return <Form title="Вход" handleClick={handleLogin} />;
};
