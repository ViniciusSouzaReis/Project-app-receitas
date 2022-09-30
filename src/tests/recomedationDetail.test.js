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

const mockRecipieDetail = {
  meals: [{
    idMeal: '52977',
    strMeal: 'Corba',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Turkish',
    strInstructions: 'Pick through your lentil…ridge for about a week.',
    strMealThumb:	'https://www.themealdb.co…als/58oia61564916529.jpg',
    strTags: 'Soup',
    strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
    strIngredient1: 'Lentils',
    strIngredient2: 'Onion',
    strIngredient3: 'Carrots',
    strIngredient4: 'Tomato Puree',
    strIngredient5: 'Cumin',
    strIngredient6: 'Paprika',
    strIngredient7: 'Mint',
    strIngredient8: 'Thyme',
    strIngredient9: 'Black Pepper',
    strIngredient10: 'Red Pepper Flakes',
    strIngredient11: 'Vegetable Stock',
    strIngredient12: 'Water',
    strIngredient13: 'Sea Salt',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '1 cup ',
    strMeasure2: '1 large',
    strMeasure3: '1 large',
    strMeasure4: '1 tbs',
    strMeasure5: '2 tsp',
    strMeasure6: '1 tsp ',
    strMeasure7: '1/2 tsp',
    strMeasure8: '1/2 tsp',
    strMeasure9: '1/4 tsp',
    strMeasure10: '1/4 tsp',
    strMeasure11: '4 cups ',
    strMeasure12: '1 cup ',
    strMeasure13: 'Pinch',
    strMeasure14: ' ',
    strMeasure15: ' ',
    strMeasure16: ' ',
    strMeasure17: ' ',
    strMeasure18: ' ',
    strMeasure19: ' ',
    strMeasure20: ' ',
    strSource: 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  }],
  drinks: [{
    idDrink: '15997',
    strDrink: 'GG',
    strDrinkAlternate: null,
    strTags: null,
    strVideo: null,
    strCategory: 'Ordinary Drink',
    strIBA: null,
    strAlcoholic: 'Optional alcohol',
    strGlass: 'Collins Glass',
    strInstructions: 'Pour the Galou now have a your very own GG.',
    strInstructionsES: null,
    strInstructionsDE: 'Den GallianoDu hast jetzt ein eigenes GG.',
    strInstructionsFR: null,
    strInstructionsIT: 'Versare il liquore Gnale.',
    // strInstructionsZH-HANS:null,
    // strInstructionsZH-HANT:null,
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    strIngredient1: 'Galliano',
    strIngredient2: 'Ginger ale',
    strIngredient3: 'Ice',
    strIngredient4: null,
    strIngredient5: null,
    strIngredient6: null,
    strIngredient7: null,
    strIngredient8: null,
    strIngredient9: null,
    strIngredient10: null,
    strIngredient11: null,
    strIngredient12: null,
    strIngredient13: null,
    strIngredient14: null,
    strIngredient15: null,
    strMeasure1: '2 1/2 shots ',
    strMeasure2: null,
    strMeasure3: null,
    strMeasure4: null,
    strMeasure5: null,
    strMeasure6: null,
    strMeasure7: null,
    strMeasure8: null,
    strMeasure9: null,
    strMeasure10: null,
    strMeasure11: null,
    strMeasure12: null,
    strMeasure13: null,
    strMeasure14: null,
    strMeasure15: null,
    strImageSource: null,
    strImageAttribution: null,
    strCreativeCommonsConfirmed: 'No',
    dateModified: '2016-07-18 22:06:00',
  }],
};

const mockRecipieDetail2 = {
  meals: null,
  drinks: null,
};

console.log(mockRecipieDetail);
// global.fetch.mockClear();

beforeEach(() => {
  // localStorage.setItem('doneRecipes', JSON.stringify(localStorageMockDone));
  localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMockFav));
  // localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageMockInProgress));
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
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouter(<App />);
    // renderWithRouter(<App />);

    login();

    const btnMeals = await screen.findByTestId('meals-bottom-btn');
    userEvent.click(btnMeals);

    async function clicaCard(texto) {
      const btnType = await screen.findByTestId(texto);
      userEvent.click(btnType);

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockRecipieDetail),
      }));
      const btnSearch3 = await screen.findByTestId('0-recipe-card');
      userEvent.click(btnSearch3);
      global.fetch.mockClear();
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
      userEvent.click(btnFavorite);
      userEvent.click(btnFavorite);

      const checkbox = screen.getAllByLabelText(/Check Ingredients/i);
      console.log(checkbox);
      checkbox.map((e) => (
        userEvent.click(e)
      ));

      const getFavorite = screen.getByTestId('share-btn');
      userEvent.click(getFavorite);

      const btnFinish = screen.getByTestId('finish-recipe-btn');
      userEvent.click(btnFinish);

      const btnProfile = await screen.findByTestId(PROFILE_BTN);
      userEvent.click(btnProfile);
    }

    // voltaMenu();

    // // clicaCard('meals-bottom-btn');
    // const btnDrink = await screen.findByTestId('drinks-bottom-btn');
    // userEvent.click(btnDrink);

    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(mockRecipieDetail2),
    // }));
    // const btnSearch4 = await screen.findByTestId('0-recipe-card');
    // userEvent.click(btnSearch4);
    // global.fetch.mockClear();

    // voltaMenu();
    // history.back();

    // const btnType = await screen.findByTestId('meals-bottom-btn');
    // userEvent.click(btnType);

    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(mockRecipieDetail),
    // }));
    // const btnSearch3 = await screen.findByTestId('0-recipe-card');
    // userEvent.click(btnSearch3);
    // global.fetch.mockClear();

    // voltaMenu();

    // const btnType2 = await screen.findByTestId('meals-bottom-btn');
    // userEvent.click(btnType2);

    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve(mockRecipieDetail2),
    // }));
    // const btnSearch5 = await screen.findByTestId('0-recipe-card');
    // userEvent.click(btnSearch5);
    // global.fetch.mockClear();
  });
});
