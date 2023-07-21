import { Link, useParams } from "react-router-dom";
import styles from "./CaregoryPage.module.css";
import { gqlOneCatWithGoodsImgs } from "../../sql/request";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionPromise } from "../../store/promiseReduser";
import Skeleton from "react-loading-skeleton";
import { CircularProgress } from "@mui/material";
function CategoryPage() {
  const { categoryId } = useParams();
  // console.log(useParams());
  const dispatch = useDispatch();
  const podCategory = useSelector(
    (state) => state.query.getOneCatWithGoodsImgs
  );
  const { status, payload } = podCategory || {};

  useEffect(() => {
    dispatch(
      actionPromise(
        "getOneCatWithGoodsImgs",
        gqlOneCatWithGoodsImgs(categoryId)
      )
    );
  }, [dispatch, categoryId]);

  // useEffect(() => {
  //   if (payload) {
  //     console.log(payload.CategoryFindOne);
  //   }
  // }, [payload]);

  return status === "PENDING" || !status ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
   
    <>
      

      <h1 className={styles.ourWorks}>
        {payload?.CategoryFindOne?.name ? payload.CategoryFindOne.name : ""}
      </h1>
      <div className={styles.cardsContainer}>
        {payload &&
          payload.CategoryFindOne &&
          payload.CategoryFindOne.goods &&
          payload.CategoryFindOne.goods.length > 0 &&
          payload.CategoryFindOne.goods.map((item) => (
            <div className={styles.cardsItem} key={item._id}>
              <div className={styles.inside}>
                <img
                  className={styles.imgCard}
                  src={`http://shop-roles.node.ed.asmer.org.ua/${item.images[0].url}`}
                  alt="серьезно?"
                />

                <h2>{item.name}</h2>

                <p>{item.price} грн.</p>
              </div>

              <button className={styles.button}>
                <Link className={styles.link} to={`/good/${item._id}`}>подробно</Link>
                {/* <Link to="/good/:goodId">подробно</Link> */}
              </button>
            </div>
          ))}
      </div>
      
    </>
  );
}
export default CategoryPage;


