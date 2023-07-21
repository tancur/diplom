// export function localStoredReducer(originalReducer, localStorageKey) {
//   let firstRun = true;

//   return function wrapper(state, action) {
//     if (firstRun) {
//       firstRun = false;
//       const keyData = localStorage.getItem(localStorageKey);

//       if (keyData !== "{}" && keyData !== null) {
//         return JSON.parse(keyData);
//       }
//     }

//     const newState = originalReducer(state, action);
//     localStorage.setItem(localStorageKey, JSON.stringify(newState));
//     return newState;
//   };
// }
export function localStoredReducer(originalReducer, localStorageKey) {
  const storedState = localStorage.getItem(localStorageKey);

  return function wrapper(state, action) {
    if (state === undefined && storedState) {
      return JSON.parse(storedState);
    }

    const newState = originalReducer(state, action);

    if (newState !== state) {
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
    }

    return newState;
  };
}
