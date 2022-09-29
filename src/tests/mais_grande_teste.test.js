import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

// const PROFILE_BTN = 'profile-top-btn';
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
    // const { history } = renderWithRouter(<App />);
    renderWithRouter(<App />);

    login();

    const btnDrinks = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);

    const btnSearch3 = await screen.findByTestId('0-recipe-card');
    userEvent.click(btnSearch3);

    const teste = await screen.findByText(/Pick through your lentils/);
    expect(teste).toBeInTheDocument();
  });
});
