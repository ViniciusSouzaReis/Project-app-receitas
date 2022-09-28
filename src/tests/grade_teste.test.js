import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const PROFILE_BTN = 'profile-top-btn';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const FILTER_BTN = 'exec-search-btn';

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

describe('Teste de cobertura geral', () => {
  test('typing tests', async () => {
    render(<App />);

    login();

    // const btnMeals = screen.getByTestId('meals-bottom-btn');

    function testaHeader() {
      const btnSearch = screen.getByTestId(SEARCH_BTN);

      userEvent.click(btnSearch);

      const searchInput = screen.getByTestId(SEARCH_INPUT);
      const radInputIngredient = screen.getByTestId('ingredient-search-radio');
      const radInputFirstLetter = screen.getByTestId('first-letter-search-radio');
      const radInputName = screen.getByTestId('name-search-radio');
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

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);
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

    logout();
    login();

    //

    const btnPerfil = screen.getByTestId(PROFILE_BTN);
    userEvent.click(btnPerfil);

    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);

    const btnPerfil2 = screen.getByTestId(PROFILE_BTN);
    userEvent.click(btnPerfil2);

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);

    //

    logout();
    login();

    const btnSearch2 = screen.getByTestId(SEARCH_BTN);
    userEvent.click(btnSearch2);

    const searchInput2 = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(searchInput2, 'Corba');

    const radInputName2 = screen.getByTestId('name-search-radio');
    userEvent.click(radInputName2);

    const btnFilter2 = await screen.findByTestId(FILTER_BTN);
    userEvent.click(btnFilter2);

    const teste = await screen.findByText(/Pick through your lentils/);
    expect(teste).toBeInTheDocument();

    // header
  });
});
