import { gql } from "./gql";
// запрос корневого каталога товаров
// ==========================================
// вывод корневого каталога

export const gqlRootCats = () => {
  const catQuery = `query cats($q: String) {
      CategoryFind(query: $q) {
        _id
        name
       
      }
    }`;

  return gql(catQuery, { q: '[{"parent": null}]' });
};

// Запит для отримання однієї категорії з товарами та картинками

export const gqlOneCatWithGoodsImgs = (id) => {
  const catsWithImgsQuery = `query oneCatWithGoodsImgs($q: String){
    CategoryFindOne(query: $q){ _id name image{url}
    goods{_id name price images{url}}
  }}`;

  return gql(catsWithImgsQuery, {
    //  q: '[{"_id":"62c94b10b74e1f5f2ec1a0dd"}]' исходник

    q: JSON.stringify([{ _id: id }]),
  });
};

// Запит на отримання товару з описом та картинками

export const gqlCatsWithImgsDescription = (id) => {
  const catsWithImgsDescriptionQuery = `query catsWithImgsDescription($q: String) {
      GoodFindOne(query: $q) {
        _id
        images {
          url
        }
        name
        price
        description
      }
    }`;

  return gql(catsWithImgsDescriptionQuery, {
    q: JSON.stringify([{ _id: id }]),

    // q: '[{"_id":${id}}]', не работает

    // q: '[{"_id":"62d57ab8b74e1f5f2ec1a148"}]', исходник
  });
};

// АВТОРИЗАЦИЯ

// Запит на реєстрацію

export const gqlRegister = (login, password) => {
  const registerMutation = `mutation register($login: String, $password: String) {
      UserUpsert(user: { login: $login, password: $password }) {
        login
        createdAt
        _id
      }
    }`;
  return gql(registerMutation, { login: login, password: password });
  // return gql(registerMutation, { login: "vasya1999", password: "пороль" });
};

// Запит на логін

export const gqlLogin = (login, password) => {
  const loginQuery = `query login($login: String, $password: String) {
      login(login: $login, password: $password)
    }`;

  return gql(loginQuery, { login: login, password: password });
};

