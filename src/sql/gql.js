export function getGQL(url = "http://shop-roles.node.ed.asmer.org.ua/graphql") {
  return async function gql(query, variables = {}) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (localStorage.authToken) {
      headers.Authorization = "Bearer " + localStorage.authToken;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: query, variables: variables }),
    });
    const data = await response.json();

    if (data.errors) {
      throw new Error("Ошибка сервера:" + JSON.stringify(data.errors));
    }
    return Object.values(data)[0];
  };
}

// переменная для замыкания
const url = "http://shop-roles.node.ed.asmer.org.ua/graphql";

// замыкаем функцию на url-е  и экспортируем

export const gql = getGQL(url);
