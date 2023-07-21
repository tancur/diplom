import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGoBack as goBack } from "../../utils/goBack";
import styles from "./Basket.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import RemoveIcon from "@mui/icons-material/Remove";

import { useEffect, useState } from "react";
import { actionCartAdd, actionCartDel,actionCartSub } from "../../store/cartReduser";
// import styles from "../categoryPage/CaregoryPage.module.css";
function Basket() {
  const goodsToBuy = useSelector((state) => state.basket);
  console.log(goodsToBuy);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState();
  const goods = Object.values(goodsToBuy);
  const dispatch = useDispatch();
  // console.log(goods);
  // useEffect(() => {
  //   if (!goodsToBuy || Object.keys(goodsToBuy).length === 0) {
  //     setCount(null);
  //   }
  // }, [goodsToBuy, count]);
  return (
    <>
      {goods && goods.length > 0 ? (
        <div className={styles.cardsContainer}>
          {/* {console.log(goods)} */}

          {goods.map((good) => (
            <div className={styles.cardsItem}>
              <div className={styles.inside}>
                {good?.good?.images && (
                  <img
                    className={styles.imgCard}
                    src={`http://shop-roles.node.ed.asmer.org.ua/${good.good.images[0].url}`}
                    alt="серьезно?"
                  />
                )}
                {console.log(good.good.price)}
                <h4>{good.good.name}</h4>

                <p>{good.good.price} грн.</p>
                <p>
                  <RemoveIcon onClick={() => {
                      setCount(count - 1);
                      
                      dispatch(actionCartSub(good.good));
                    }} />
                </p>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                />
                <p>
                  <AddIcon
                    onClick={() => {
                      setCount(count + 1);
                      // console.log(good.good);
                      dispatch(actionCartAdd(good.good));
                    }}
                  />
                </p>
                <p>итого </p>
                <p>
                  <DeleteIcon
                    onClick={() => {
                      console.log(good.good);
                      dispatch(actionCartDel(good.good));
                    }}
                  />
                </p>
              </div>
            </div>
          ))}
          {/* общие кнопки для корзины */}
          <div className={styles.buttonDiv}>
            <button className={styles.button}>оформить заказ</button>

            <button className={styles.button}>
              {" "}
              очистить корзину
              {/* <Link to="/good/:goodId">подробно</Link> */}
            </button>
            <p className={styles.homeIcon}>
              <Link to="/">
                <HomeIcon />
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <h1>EMPTY</h1>
      )}
    </>
  );
}
export default Basket;
