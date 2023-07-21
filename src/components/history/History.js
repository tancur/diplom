import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionPromise } from "../../store/promiseReduser";
import { gqlOrderFind } from "../../sql/order";
import { CircularProgress } from "@mui/material";
import { HistoryItem } from "./HistoryItem";
import styles from './History.module.css'
export function History() {
  const order = useSelector((state) => state.query.orderFind);
  // console.log(order)
  const { status, payload } = order || {};
  
  console.log(payload);

  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionPromise("orderFind", gqlOrderFind()));
    console.log("диспатч сработал");
  }, []);
  return status === "PENDING" || !status ? (
    <div>
      <CircularProgress />
    </div>
  ) : ( 
    <div className={styles.historyDiv}>
     {payload.OrderFind.map(good => {
      console.log(good); 
      return <HistoryItem key={good._id} good={good} />;
    })}
      
      
    </div>
  );
 
}
