import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste de cobertura geral', () => {
  test('typing tests', () => {
    render(<App />);

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
      const btnPerfil = screen.getByTestId('profile-top-btn');
      userEvent.click(btnPerfil);

      const btnLogout = screen.getByTestId('profile-logout-btn');
      userEvent.click(btnLogout);
    }

    login();
    // login
    const teste = screen.getByAltText(/Pick through your lentils/);

    const btnMeals = screen.getByTestId('meals-bottom-btn');

    function testaHeader() {
      const btnSearch = screen.getByTestId('search-top-btn');

      userEvent.click(btnSearch);

      const searchInput = screen.getByTestId('search-input');
      const radInputIngredient = screen.getByTestId('ingredient-search-radio');
      const radInputFirstLetter = screen.getByTestId('first-letter-search-radio');
      const radInputName = screen.getByTestId('name-search-radio');
      const btnFilter = screen.getByTestId('exec-search-btn');

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

    const btnSearch = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearch);

    const radInputFirstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'bb');
    userEvent.click(radInputFirstLetter);

    const btnFilter = screen.getByTestId('exec-search-btn');
    userEvent.click(btnFilter);

    logout();
    login();

    const btnSearch2 = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearch2);

    const searchInput2 = screen.getByTestId('search-input');
    userEvent.type(searchInput2, 'Corba');

    const radInputName2 = screen.getByTestId('name-search-radio');
    userEvent.click(radInputName2);

    const btnFilter2 = screen.getByTestId('exec-search-btn');
    userEvent.click(btnFilter2);

    // header

    const btnPerfil = screen.getByTestId('profile-top-btn');
    userEvent.click(btnPerfil);

    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);

    const btnPerfil2 = screen.getByTestId('profile-top-btn');
    userEvent.click(btnPerfil2);

    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);

    // profile

    // userEvent.click(emailInput);
    // userEvent.type(emailInput, 'xablau@xablau.com');

    // userEvent.click(passwordInput);
    // userEvent.type(passwordInput, '1234567');

    // userEvent.click(btn);
  });
});
