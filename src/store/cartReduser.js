// КОРЗИНА И ВСЕ РЕДЮСЕРЫ И ЭКШЕНЫ ПО КОРЗИНЕ
// =============================================

// типы экшОнов

export const actionCartAdd = (good, count = 1) => ({ type: "CART_ADD", count, good });

export const actionCartSub = (good, count = 1) => ({ type: "CART_SUB", count, good });

export const actionCartDel = (good) => ({ type: "CART_DEL", good });

export const actionCartSet = (good, count = 1) => ({ type: "CART_SET", count, good });

export const actionCartClear = () => ({ type: "CART_CLEAR" });

// функция редюсер

export function cartReducer(state = {}, { type, count, good }) {
  if (type === "CART_ADD") {
    const { _id } = good;
    if (count < 0) {
      return { ...state };
    } else {
      return {
        ...state,
        [_id]: {
          good,
          count: state[_id] ? state[_id].count + count : count,
        },
      };
    }
  }

  if (type === "CART_SUB") {
    const { _id } = good;
    const newCount = state[_id].count - count;
    if (count < 0) {
      return { ...state };
    }
    if (newCount > 0) {
      return {
        ...state,
        [_id]: {
          good,
          count: newCount,
        },
      };
    } else {
      const newState = { ...state };
      delete newState[_id];
      return newState;
    }
  }

  if (type === "CART_DEL") {
    const { _id } = good;
    const newState = { ...state };
    delete newState[_id];
    return newState;
  }

  if (type === "CART_SET") {
    const { _id } = good;
    const newCount = count;

    if (newCount > 0) {
      return {
        ...state,
        [_id]: {
          good,
          count: newCount,
        },
      };
    } else {
      const newState = { ...state };
      delete newState[_id];
      return newState;
    }
  }

  if (type === "CART_CLEAR") {
    return (state = {});
  } else {
    return state;
  }
}