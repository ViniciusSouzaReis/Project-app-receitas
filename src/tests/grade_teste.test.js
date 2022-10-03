import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const PROFILE_BTN = 'profile-top-btn';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const FILTER_BTN = 'exec-search-btn';
const NAME_FILTER = 'name-search-radio';

jest.setTimeout(10000);
window.alert = jest.fn('retornou');

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

function logout() {
  const btnPerfil = screen.getByTestId(PROFILE_BTN);
  userEvent.click(btnPerfil);

  const btnLogout = screen.getByTestId('profile-logout-btn');
  userEvent.click(btnLogout);
}

jest.setTimeout(10000);

describe('Teste de cobertura geral', () => {
  test('typing tests', async () => {
    const { history } = renderWithRouter(<App />);

    login();

    const btnMeals = await screen.findByTestId('meals-bottom-btn');
    userEvent.click(btnMeals);

    const btnCategory1 = await screen.findByTestId('Beef-category-filter');
    userEvent.click(btnCategory1);

    const btnCategory2 = await screen.findByTestId('Chicken-category-filter');
    userEvent.click(btnCategory2);

    const btnCategory3 = await screen.findByTestId('Dessert-category-filter');
    userEvent.click(btnCategory3);

    const btnCategory4 = await screen.findByTestId('Goat-category-filter');
    userEvent.click(btnCategory4);

    const btnCategory5 = await screen.findByTestId('All-category-filter');
    userEvent.click(btnCategory5);

    function testaHeader() {
      const btnSearch = screen.getByTestId(SEARCH_BTN);

      userEvent.click(btnSearch);

      const searchInput = screen.getByTestId(SEARCH_INPUT);
      const radInputIngredient = screen.getByTestId('ingredient-search-radio');
      const radInputFirstLetter = screen.getByTestId('first-letter-search-radio');
      const radInputName = screen.getByTestId(NAME_FILTER);
      const btnFilter = screen.getByTestId(FILTER_BTN);

      userEvent.type(searchInput, 'b');
      userEvent.click(radInputFirstLetter);
      userEvent.click(btnFilter);
      userEvent.click(radInputName);
      userEvent.click(btnFilter);

      userEvent.click(radInputFirstLetter);
      userEvent.click(radInputIngredient);
    }

    testaHeader();

    logout();
    login();

    const btnDrinks = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);

    const btnCategory6 = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(btnCategory6);

    const btnCategory7 = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(btnCategory7);

    const btnCategory8 = await screen.findByTestId('Shake-category-filter');
    userEvent.click(btnCategory8);

    const btnCategory9 = await screen.findByTestId('Other/Unknown-category-filter');
    userEvent.click(btnCategory9);

    const btnCategory11 = await screen.findByTestId('Cocoa-category-filter');
    userEvent.click(btnCategory11);

    const btnCategory10 = await screen.findByTestId('All-category-filter');
    userEvent.click(btnCategory10);

    testaHeader();

    logout();
    login();

    const btnSearch = screen.getByTestId(SEARCH_BTN);
    userEvent.click(btnSearch);

    const radInputFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput, 'bb');
    userEvent.click(radInputFirstLetter);

    const btnFilter = screen.getByTestId(FILTER_BTN);
    userEvent.click(btnFilter);

    const radInputName = screen.getByTestId(NAME_FILTER);
    userEvent.click(radInputName);
    userEvent.click(btnFilter);

    logout();
    login();

    //

    const btnPerfil = await screen.findByTestId(PROFILE_BTN);
    userEvent.click(btnPerfil);

    const btnDone = await screen.findByTestId('profile-done-btn');
    userEvent.click(btnDone);

    const btnPerfil2 = await screen.findByTestId(PROFILE_BTN);
    userEvent.click(btnPerfil2);

    const btnFavorite = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);

    //

    logout();
    login();

    const btnSearch2 = await screen.findByTestId(SEARCH_BTN);
    userEvent.click(btnSearch2);

    const searchInput2 = await screen.findByTestId(SEARCH_INPUT);
    userEvent.type(searchInput2, 'Corba');

    const radInputName2 = await screen.findByTestId(NAME_FILTER);
    userEvent.click(radInputName2);

    const btnFilter2 = await screen.findByTestId(FILTER_BTN);
    userEvent.click(btnFilter2);

    const teste = await screen.findByText(/Pick through your lentils/);
    expect(teste).toBeInTheDocument();

    // header

    history.push('/');

    // login();
  });

  // test('typing tests', async () => {
  //   const { history } = renderWithRouter(<App />);

  //   const btnSearch3 = await screen.findByText(SEARCH_BTN);
  //   userEvent.click(btnSearch3);

  //   login();
  // });
});
