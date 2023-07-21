import { gql } from "./gql";
import { actionPromise } from "../store/promiseReduser";
import { actionCartClear } from "../store/cartReduser";

// Запрос истории заказов  OrderFind, выводит заказы, но не выводт полную инфу ( наименования, кратинки и пр ),  total = 0  !!!

export const gqlOrderFind = () => {
  const OrderFind = `query OrderFind ($q: String) {OrderFind (query: $q) {
    _id 
    createdAt 
   
    orderGoods {count good{name price }}
    
}
}`;

  return gql(OrderFind, { q: "[{}]" });
};

// Запрос на корзину OrderUpsert

export const gqlOrderUpsert = (goods) => {
  const OrderUpsert = `mutation newOrder($goods: [OrderGoodInput]) {
          OrderUpsert(order: {orderGoods: $goods}) {
              _id
              createdAt
              total
          }
        }`;

  return gql(OrderUpsert, {
    goods: goods,
    // good: { _id: "62d3099ab74e1f5f2ec1a125" },
  });
};

// THUNK  корзины OrderUpsert сложный вариант Кирилла

export const actionOrderCreate = () => {

  return async (dispatch, state) => {
    const goodToOrder =
      state().basket &&
      Object.values(state().basket) &&
      Object.values(state().basket).map((item) => ({
        count: item.count,
        good: { _id: item.good._id },
      }));
    console.log(`ВЫВОД goodToOrder`);
    console.log(goodToOrder);

    const data = await dispatch(
      actionPromise("getOrderUpsert", gqlOrderUpsert(goodToOrder))
    );
    if (data) {
      await dispatch(actionCartClear());
      

    }
  };
};


export const createGood = (good) => {
  const newGood = `mutation createGood($good: GoodInput) {
    GoodUpsert(good: $good){
      _id
      name
    }
    }`;

  return gql(createGood, {good: good });
};