import React from 'react';
import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import customRender from './services/customRender';

const userNameTestId = 'profile-email';
const doneButtonTestId = 'profile-done-btn';
const favButtonTestId = 'profile-favorite-btn';
const logoutButtonTestId = 'profile-logout-btn';

describe('Teste da página de Profile', () => {
  test('Se a página de profile renderiza sem localStorage, sem mostrar email', () => {
    const providerProps = {
      value: '',
    };
    customRender(<Profile />, { providerProps });

    const userEmail = screen.queryByTestId(userNameTestId);
    expect(userEmail.innerHTML).toBe('');

    const doneRecipesButton = screen.getByTestId(doneButtonTestId);
    expect(doneRecipesButton).toBeInTheDocument();

    const favRecipesButton = screen.getByTestId(favButtonTestId);
    expect(favRecipesButton).toBeInTheDocument();

    const logoutRecipesButton = screen.getByTestId(logoutButtonTestId);
    expect(logoutRecipesButton).toBeInTheDocument();
  });

  test('Se a página de profile renderiza mostrando o email do usuário', () => {
    const providerProps = {
      value: '',
    };
    localStorage.setItem('user', JSON.stringify({ email: 'teste@testando.com.marrocos' }));
    customRender(<Profile />, { providerProps });

    const userEmail = screen.queryByTestId(userNameTestId);
    expect(userEmail.innerHTML).toBe('teste@testando.com.marrocos');

    const doneRecipesButton = screen.getByTestId(doneButtonTestId);
    expect(doneRecipesButton).toBeInTheDocument();

    const favRecipesButton = screen.getByTestId(favButtonTestId);
    expect(favRecipesButton).toBeInTheDocument();

    const logoutRecipesButton = screen.getByTestId(logoutButtonTestId);
    expect(logoutRecipesButton).toBeInTheDocument();
  });
});
