const PRODUCT_KEY = 'email';

if (!JSON.parse(localStorage.getItem(PRODUCT_KEY))) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify([]));
}
const readProductCard = (id) => JSON.parse(localStorage.getItem(id)) || [];

const saveProductCard = (id, product) => localStorage
  .setItem(id, JSON.stringify(product));

export const getListAvaliation = (id) => readProductCard(id);

export const addAvaliation = (id, product) => {
  if (product) {
    const favoriteProducts = readProductCard(id);
    saveProductCard(id, [...favoriteProducts, product]);
  }
};
