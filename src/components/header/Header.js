import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionAuthLogout } from "../../store/authReducer";
import { Count } from "../basket/Count";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function Header(params) {
  const state = useSelector((state) => state.auth);
  const { payload, token } = state;
  

 
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/history">История заказов</NavLink>
      <div className={styles.cartIcon}>
        {" "}
        <p><NavLink to="/basket">Корзина</NavLink></p>
        <p><Count/></p>
      </div>
      {/* <NavLink to="/posts/">Oбщая cтраница каких то постов</NavLink> */}

      <NavLink to ='/upload/'>Загрузчик фоток</NavLink>
      {token && (
        <>
          {" "}
          <p>Привет, {payload.sub.login}</p>{" "}
          <button
            className={styles.button}
            onClick={() => dispatch(actionAuthLogout())}
          >
            Выход
          </button>
        </>
      )}
      {!token && <NavLink to="/login">Вход</NavLink>}
      {!token && <NavLink to="/register">Pегистрация</NavLink>}
    </header>
  );
}
