// const EMAIL_KEY = 'user';
// const MEALSTOKEN_KEY = 'mealsToken';
// const DRINKSTOKEN_KEY = 'drinksToken';

// if (!JSON.parse(localStorage.getItem(EMAIL_KEY))) {
//   localStorage.setItem(EMAIL_KEY, JSON.stringify([]));
// }

// if (!JSON.parse(localStorage.getItem(MEALSTOKEN_KEY))) {
//   localStorage.setItem(MEALSTOKEN_KEY, JSON.stringify([]));
// }

// if (!JSON.parse(localStorage.getItem(DRINKSTOKEN_KEY))) {
//   localStorage.setItem(DRINKSTOKEN_KEY, JSON.stringify([]));
// }
const readProductCard = (id) => JSON.parse(localStorage.getItem(id)) || [];

export const saveProductCard = (id, product) => localStorage
  .setItem(id, JSON.stringify(product));

export const getListAvaliation = (id) => readProductCard(id);

export const addAvaliation = (id, product) => {
  if (product) {
    const favoriteProducts = readProductCard(id);
    saveProductCard(id, [...favoriteProducts, product]);
  }
};
