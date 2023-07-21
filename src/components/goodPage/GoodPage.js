import { Link, useParams } from "react-router-dom";
// мой гениальный хук для перехода на шаг назад
import { useGoBack as goBack } from "../../utils/goBack";
import styles from "./Good.module.css";

import { gqlCatsWithImgsDescription } from "../../sql/request";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionPromise } from "../../store/promiseReduser";
import { actionCartAdd } from "../../store/cartReduser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function GoodPage() {
  const { goodId } = useParams();
  // console.log(goodId);
  const dispatch = useDispatch();
  const OneGood = useSelector(
    (state) => state.query.getCatsWithImgsDescription
  );
  const goodsToBuy = useSelector((state) => state.basket);

  const key = Object.keys(goodsToBuy);
  console.log(key);
  // const isAddedToCart = useSelector(
  //   (state) => state.basket
  // );
  // console.log(OneGood);
  const { status, payload } = OneGood || {};
  useEffect(() => {
    dispatch(
      actionPromise(
        "getCatsWithImgsDescription",
        gqlCatsWithImgsDescription(goodId)
      )
    );
  }, [dispatch, goodId]);

  // useEffect(() => {
  //   if (payload) {
  //     console.log(payload.GoodFindOne);
  //   }
  // }, [payload]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className={styles.cardsItem}>
        <div className={styles.inside}>
          <h2> {payload?.GoodFindOne?.name ? payload.GoodFindOne.name : ""}</h2>
          {payload?.GoodFindOne?.images?.length > 0 && (
            <Slider {...settings} className={styles.slider}>
              {payload.GoodFindOne.images.map((img, index) => (
                <div key={index} className={styles.slide}>
                  <img
                    className={styles.imgCard}
                    src={`http://shop-roles.node.ed.asmer.org.ua/${img.url}`}
                    alt="name"
                  />
                </div>
              ))}
            </Slider>
          )}

          <h3>
            {" "}
            {payload?.GoodFindOne?.description
              ? payload.GoodFindOne.description
              : ""}
          </h3>

          <p>
            {payload?.GoodFindOne?.price ? payload.GoodFindOne.price : ""} грн
          </p>
        </div>
        {!key.includes(goodId) ? (
          <button
            className={styles.button}
            onClick={() => {
              dispatch(actionCartAdd(payload?.GoodFindOne));
            }}
          >
            купить
          </button>
        ) : (
          <p>
            Товар добавлен корзину
            <Link to={"/basket/"}>Перейти в корзину</Link>
          </p>
        )}

        <button className={styles.button} onClick={goBack()}>
          {" "}
          назад
        </button>
      </div>
    </>
  );
}
