import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Basket.module.css";

import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { actionCartClear } from "../../store/cartReduser";
import BasketGood from "./BasketGood";
import { actionOrderCreate } from "../../sql/order";
function Basket() {
  const goodsToBuy = useSelector((state) => state.basket);
  // console.log(goodsToBuy);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState();
  const navigate = useNavigate()
  const goods = Object.values(goodsToBuy);
 

  const dispatch = useDispatch();
  
  useEffect(() => {
    const totalSum = goods.reduce((accumulator, good) => {
      return accumulator + good.count * good.good.price;
    }, 0);
    setSum(totalSum);
  }, [goods]);

  return (
    <>
      {goods && goods.length > 0 ? (
        <div className={styles.cardsContainer}>
          {goods.map((good) => {
            // console.log(sum);

            return <BasketGood good={good} goodCount={good.count} />;
          })}
          {/* общие кнопки для корзины */}

          <div className={styles.buttonDiv}>
            <button className={styles.button}>всего к оплате {sum}грн.</button>
            <button
              className={styles.button}
              onClick={() => {
                setCount(0);

                dispatch(actionOrderCreate());
                navigate("/congratulation/")
              }}
            >
              оформить заказ
            </button>

            <button
              className={styles.button}
              onClick={() => {
                setCount(0);

                dispatch(actionCartClear());
               
              }}
            >
              {" "}
              очистить корзину
            </button>
            <p className={styles.homeIcon}>
              <Link to="/">
                <HomeIcon />
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <h1 className={styles.epty}>Ваша корзина пуста</h1>
      )}
    </>
  );
}
export default Basket;
