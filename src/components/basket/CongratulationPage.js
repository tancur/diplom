import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Basket.module.css";
export function CongratulationPage() {
  const orderNumber = useSelector((state) => state.query.getOrderUpsert);
  const { status, payload } = orderNumber || {};
  // const {payload}=orderNumber||{}
  // console.log(payload.OrderUpsert._id);
  return (
    <div className={styles.cardsItem}>
      {payload?.OrderUpsert?._id && (
      <p>Поздравляю ваш заказ № {payload.OrderUpsert._id} отправлен успешно</p>
      )}
      <Link to={"/history/"}>Посмотреть историю заказов</Link>
    </div>
  );
}
