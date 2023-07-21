import React from "react";

import { Header } from "../header/Header";

import { Footer } from "../footer/Footer";
import { Aside } from "../aside/Aside";
import { Outlet } from "react-router-dom";
// import { Main } from "../Main/Main";
import styles from "./Homepage.module.css";

export function Homepage(params) {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Aside />
        <div id="outlet">
          <Outlet />
        </div>
      </main>
      {/* <Main /> */}

      <Footer />
    </div>
  );
}
