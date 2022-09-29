import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

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

    // const btnShare2 = await screen.findByTestId('share-btn');
    // userEvent.click(btnShare2);

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

    history.push('/');
  });
});
