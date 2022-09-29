import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

// const copy = require('clipboard-copy');
// document.execCommand = jest.fn('copy').mockResolvedValue('');
document.execCommand = jest.fn().mockResolvedValue('');

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const localStorageMockFav = [
  { alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  }, {
    alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal',
  }, {
    alcoholicOrNot: '',
    category: 'Side',
    id: '53060',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    type: 'meal',
  },
];

const localStorageMockDone = [{
  alcoholicOrNot: '',
  category: 'Vegetarian',
  doneDate: '23/06/2020',
  id: '52771',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  name: 'Spicy Arrabiata Penne',
  nationality: 'Italian',
  tags: ['Pasta', 'Curry'],
  type: 'meal',
}, {
  alcoholicOrNot: 'Alcoholic',
  category: 'Cocktail',
  doneDate: '23/06/2020',
  id: '178319',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  name: 'Aquamarine',
  nationality: '',
  tags: [],
  type: 'drink',
}, {
  alcoholicOrNot: '',
  category: 'Side',
  doneDate: '29/09/2022',
  id: '53060',
  image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  name: 'Burek',
  nationality: 'Croatian',
  tags: ['Streetfood', 'Onthego'],
  type: 'meal',
}];

const localStorageMockInProgress = {
  drinks: { 15997: [] },
  meals: { 52977: [] },
};

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(localStorageMockDone));
  localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMockFav));
  localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageMockInProgress));
});

afterEach(() => {
  localStorage.clear();
});

const PROFILE_BTN = 'profile-top-btn';
const FAVORITE_BNT = 'favorite-btn';
// const SEARCH_BTN = 'search-top-btn';
// const SEARCH_INPUT = 'search-input';
// const FILTER_BTN = 'exec-search-btn';

function login() {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const btn = screen.getByTestId('login-submit-btn');

  userEvent.click(emailInput);
  userEvent.type(emailInput, 'xablau@xablau.com');

  userEvent.click(passwordInput);
  userEvent.type(passwordInput, '1234567');

  userEvent.click(btn);
}

// function logout() {
//   const btnPerfil = screen.getByTestId(PROFILE_BTN);
//   userEvent.click(btnPerfil);

//   const btnLogout = screen.getByTestId('profile-logout-btn');
//   userEvent.click(btnLogout);
// }

describe('Teste de cobertura geral', () => {
  test('typing tests', async () => {
    const { history } = renderWithRouter(<App />);
    // renderWithRouter(<App />);

    login();

    async function clicaCard(texto) {
      const btnType = await screen.findByTestId(texto);
      userEvent.click(btnType);

      const btnSearch3 = await screen.findByTestId('0-recipe-card');
      userEvent.click(btnSearch3);
    }

    clicaCard('drinks-bottom-btn');

    const btnFavorite2 = await screen.findByTestId(FAVORITE_BNT);
    userEvent.click(btnFavorite2);
    userEvent.click(btnFavorite2);
    userEvent.click(btnFavorite2);

    async function voltaMenu() {
      const btnStartRecipie = await screen.findByTestId('start-recipe-btn');
      userEvent.click(btnStartRecipie);

      const btnFavorite = await screen.findByTestId(FAVORITE_BNT);
      userEvent.click(btnFavorite);

      const btnProfile = await screen.findByTestId(PROFILE_BTN);
      userEvent.click(btnProfile);
    }

    voltaMenu();
    // clicaCard('meals-bottom-btn');

    const btnType = await screen.findByTestId('meals-bottom-btn');
    userEvent.click(btnType);

    const btnSearch3 = await screen.findByTestId('0-recipe-card');
    userEvent.click(btnSearch3);

    const btnFavorite3 = await screen.findByTestId(FAVORITE_BNT);
    userEvent.click(btnFavorite3);
    userEvent.click(btnFavorite3);
    userEvent.click(btnFavorite3);

    // global.copy = jest.fn().mockResolvedValue('');

    // const btnShare2 = await screen.findByTestId('share-btn');
    // userEvent.click(btnShare2);

    // const mock = jest.fn(copy);

    const btnShare2 = screen.getByTestId('share-btn');
    jest.spyOn(navigator.clipboard, 'writeText');
    userEvent.click(btnShare2);

    // handleShare();

    // history.push('/');
  });
  test('typing tests', async () => {});
});
