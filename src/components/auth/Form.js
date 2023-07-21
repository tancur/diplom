import { useState } from "react";
import styles from "./Form.module.css";
const Form = ({ title, handleClick }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.form}>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="login"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={() => handleClick(login, password)}>{title}</button>
    </div>
  );
};

export { Form };
