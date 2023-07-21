import { useDispatch } from "react-redux";

import { Form } from "./Form";
import { actionFullRegister } from "../../store/authReducer";

export const SignUp = () => {
  // console.log(payload);

  const dispatch = useDispatch();

  const handleRegister = (login, password) => {
    dispatch(actionFullRegister(login, password));
  };

  return <Form title="регистрация" handleClick={handleRegister} />;
};
