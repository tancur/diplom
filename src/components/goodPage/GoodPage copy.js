import { Link, useParams } from "react-router-dom";
// мой гениальный хук для перехода на шаг назад
import { useGoBack as goBack } from "../../utils/goBack";
import styles from "./Good.module.css";

import { gqlCatsWithImgsDescription } from "../../sql/request";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionPromise } from "../../store/promiseReduser";

export function GoodPage() {
  const { goodId } = useParams();
  // console.log(goodId);
  const dispatch = useDispatch();
  const OneGood = useSelector(
    (state) => state.query.getCatsWithImgsDescription
  );
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

  useEffect(() => {
    if (payload) {
      console.log(payload.GoodFindOne);
    }
  }, [payload]);

  return (
    <>
      <div className={styles.cardsItem}>
        <div className={styles.inside}>
          {payload?.GoodFindOne?.images?.length > 0 &&
            payload.GoodFindOne.images.map((img, index) => (
              <img
                className={styles.imgCard}
                key={index}
                src={`http://shop-roles.node.ed.asmer.org.ua/${img.url}`}
                alt="name"
              />
            ))}

          <h2>
            {" "}
            {payload?.GoodFindOne?.description
              ? payload.GoodFindOne.description
              : ""}
          </h2>

          {/* <p> {payload.GoodFindOne.description}</p> */}
          <p>
            {payload?.GoodFindOne?.price ? payload.GoodFindOne.price : ""} грн
          </p>
        </div>

        <button className={styles.button}>купить</button>

        <button className={styles.button} onClick={goBack()}>
          {" "}
          назад
        </button>
      </div>
    </>
  );
}

// ВЫВОД ИНФОРМАЦИИ ПРО ОТДЕЛЬНЫЙ ТОВАР

// store.dispatch(
//   actionPromise(
//     "getCatsWithImgsDescription",
//     await gqlCatsWithImgsDescription(hash)
//   )
// );
// ===================
// function cartOfOneGood(state) {
//   // выборка из пайлоада
//   let OneGood = state?.query?.getCatsWithImgsDescription?.payload?.GoodFindOne;

//   // ВНИМАНИЕ!!!!!!!!
//   // не надо рисовать товар, если это не страница товара

//   const [, key] = window.location.hash.split("/");
//   // console.log(`ВЫВОД ИНФОРМАЦИИ ПРО ОТДЕЛЬНЫЙ ТОВАР ${key}`);

//   if (!OneGood || !(key === "nogood")) {
//     return;
//   }
//   // скрываем каталог товаров одной категории

//   let item = document.getElementById("containerOfCategory");
//   item.style.visibility = "hidden";

//   // отображение карточки отдельного товара и очистка перед заполнением

//   let popup = document.getElementById("popup");

//   popup.style.display = "flex";
//   popup.innerHTML = "";

//   let popupDiv = document.createElement("div");
//   popupDiv.className = "inside";
//   popup.append(popupDiv);

//   for (let image of OneGood.images) {
//     // console.log(image);
//     let img = document.createElement("img");
//     img.className = "img-card";
//     img.src = `http://shop-roles.node.ed.asmer.org.ua/${image.url}`;
//     popupDiv.append(img);
//   }

//   let h = document.createElement("h2");
//   h.className = "h-card";
//   h.innerHTML = OneGood.name;
//   popupDiv.append(h);

//   let p = document.createElement("p");
//   p.className = "p-card";
//   p.innerHTML = OneGood.description;
//   popupDiv.append(p);

//   let price = document.createElement("p");
//   price.className = "p-card";
//   price.innerHTML = ` ЦЕНА : ${OneGood.price} грн.`;
//   popupDiv.append(price);

//   let a = document.createElement("a");
//   a.className = "button";
//   a.id = "but";
//   a.href = `#/good/${OneGood._id}`;
//   a.innerText = "Купить";
//   popupDiv.append(a);

//   let button = document.createElement("button");
//   button.className = "button";
//   button.id = "but";

//   button.innerText = "ЗАКРЫТЬ";
//   popupDiv.append(button);

//   // при онклике скрываем карточку и очищаем, открывая каталог товаров одной категории

//   button.onclick = () => {
//     item.style.visibility = "visible";

//     popup.style.display = "none";

//     popup.innerHTML = "";
//   };
//   // ДИСПАТЧ ПО КЛИКУ "ПОЛОЖИТЬ В КОРЗИНУ"

//   a.onclick = () => {
//     store.dispatch(actionCartAdd(OneGood));
//   };

//   // console.log(OneGood);
//   // console.log(state);
// }
