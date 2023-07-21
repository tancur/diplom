import { actionPromise } from "./promiseReduser";

import { gqlRegister } from "../sql/request";
import { gqlLogin } from "../sql/request";
import { useNavigate } from "react-router-dom";

export function jwtDecode(token) {
  const [, payload] = token.split(".");
  // console.log(payload);
  const secretPart = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  // console.log("SECRET PART");
  return JSON.parse(secretPart);
}

// редюсер для запросов

export function authReducer(state = {}, { type, token }) {
  if (type === "AUTH_LOGIN") {
    const payload = jwtDecode(token);
    // console.log(payload);

    localStorage.authToken = token;
    // console.log(token);
    if (localStorage.authToken) {
      // userName.innerHTML = `Добро пожаловать,${payload.sub.login}`;
    }

    return { token, payload };
  }
  if (type === "AUTH_LOGOUT") {
    delete localStorage.authToken;
    // userName.innerHTML = "";
    return {};
  }

  return state;
}

// экшены для авторизации

export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

// THUNK  логин и пароль

export function actionFullRegister(login, password) {
  return async (dispatch) => {
    try {
      const data = await dispatch(
        actionPromise("getRegister", gqlRegister(login, password))
      );
      // console.log("dispatch getRegister", data);
      if (data.UserUpsert.login) {
        await dispatch(actionFullLogin(login, password));
        // console.log(login, password )
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function actionFullLogin(login, password) {
  return async (dispatch) => {
    const data = await dispatch(
      actionPromise("getFullLogin", gqlLogin(login, password))
    );
    // console.log(data);

    if (data) {
      await dispatch(actionAuthLogin(data.login));
    }
  };
}
