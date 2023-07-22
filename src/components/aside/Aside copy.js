import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Aside.module.css";
import CategoryPage from "../categoryPage/CategoryPage";
import { gqlRootCats } from "../../sql/request";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionPromise } from "../../store/promiseReduser";
import { NotFoundPage } from "../notFoundPage/NotFoundPage";
import Skeleton from "react-loading-skeleton";
import { CircularProgress } from "@mui/material";

export function Aside() {
  const[isAdmin,setIsAdmin]=useState(false)
  const dispatch = useDispatch();
  const rootCategories = useSelector((state) => state.query.getCategories);
  // console.log(rootCategories);
  const { error, payload, status } = rootCategories || {};

  const state = useSelector((state) => state.auth);
  // const { payload, token } = state;
  console.log(state);
  useEffect(() => {
    if (
      state.payload?.sub?.acl &&
      Object.values(state.payload.sub.acl).includes("admin")
    ) {setIsAdmin(true);
      console.log(isAdmin);
      console.log("admin");
    }
  }, [state.payload]);

  useEffect(() => {
    dispatch(actionPromise("getCategories", gqlRootCats()));
  }, [dispatch]);

  // useEffect(() => {
  //   if (payload) {
  //     console.log(payload.CategoryFind);
  //   }
  // }, [payload]);

  return (
    <>
      {error && <NotFoundPage />}
      {status === "PENDING" ? (
        <aside>
          <CircularProgress />

          {/* <Skeleton width={400} height={400} /> */}
        </aside>
      ) : (
        // <h1>ЗАГРУЗКА</h1>
        <aside className={styles.aside}>
          {payload &&
            payload.CategoryFind &&
            payload.CategoryFind.length &&
            payload.CategoryFind.map((item) => (
              <NavLink key={item._id} to={`/category/${item._id}`}>
                {item.name}
              </NavLink>
            ))}
        </aside>
      )}

      {/* <NavLink to="/category/:categoryId">Категории товаров</NavLink> */}
    </>
  );
}

// function asideRootCatalog(resultOfGetState) {
//   // выборка из пайлоада

//   let rootCategories =
//     resultOfGetState.query?.getCategories?.payload?.CategoryFind;

//   if (!rootCategories) {
//     return;
//   }
//   // заготовка для списка
//   let aside = document.getElementById("asideRootCategory");

//   aside.innerHTML = "";

//   for (let category of rootCategories) {
//     let a = document.createElement("a");

//     a.className = "aForAside";
//     a.href = `#/category/${category._id}`;
//     a.innerHTML = category.name;
//     aside.append(a);
//   }
// }

// store.dispatch(actionPromise("getCategories", gqlRootCats()));

// store.subscribe(() => {
//   // console.log(store.getState());
//   asideRootCatalog(store.getState());
// });
