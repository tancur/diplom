import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGoBack as goBack } from "../../utils/goBack";
import styles from "./Basket.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  actionCartAdd,
  actionCartDel,
  actionCartSub,
} from "../../store/cartReduser";

function BasketGood({ good, goodCount }) {
  // console.log(good, goodCount);
  const [count, setCount] = useState(goodCount);
  const [sum, setSum] = useState();

  const dispatch = useDispatch();
  

  useEffect(() => {
    setSum(count * good.good.price);
  }, [count]);

  return (
    // <div className={styles.cardsContainer}>

    <div className={styles.cardsItem}>
      <div className={styles.inside}>
       
          {good?.good?.images && (
             <Link to={`/good/${good.good._id}`}>
            <img
              className={styles.imgCard}
              src={`http://shop-roles.node.ed.asmer.org.ua/${good.good.images[0].url}`}
              alt="серьезно?"
            />
             </Link>
          )}
       
        <h4>{good.good.name}</h4>

        <p>{good.good.price} грн.</p>
        <p>
          <RemoveIcon
            onClick={() => {
              setCount(count - 1);

              dispatch(actionCartSub(good.good));
            }}
          />
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
        <p>{sum}грн </p>
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

    // </div>
  );
}
export default BasketGood;
