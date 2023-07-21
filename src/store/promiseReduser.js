// редюсер для запросов

export function promiseReducer(
  state = {},
  { type, promiseName, status, payload, error }
) {
  if (type === "PROMISE") {
    return {
      ...state,
      [promiseName]: { status, payload, error },
    };
  }
  return state;
}

// экшены

const actionPending = (promiseName) => ({
  type: "PROMISE",
  promiseName,
  status: "PENDING",
});
const actionFulfilled = (promiseName, payload) => ({
  type: "PROMISE",
  promiseName,
  status: "FULFILLED",
  payload,
});
const actionRejected = (promiseName, error) => ({
  type: "PROMISE",
  promiseName,
  status: "REJECTED",
  error,
});

// THUNK для промисов
// экспорт как отдельная функция в компоненте promiseReducer

export function actionPromise(promiseName, promise) {
  return async (dispatch) => {
    dispatch(actionPending(promiseName));
    try {
      const payload = await promise;
      dispatch(actionFulfilled(promiseName, payload));
      return payload;
    } catch (error) {
      dispatch(actionRejected(promiseName, error));
    }
  };
}
// конец экспорта
