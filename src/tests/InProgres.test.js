import React from 'react';
import customRender from './services/customRender';
import RecipeInProgress from '../pages/RecipeInProgress';

const pathname = '/meals/52977/in-progress';

describe('Teste da página de Profile', () => {
  test('Se a página de profile renderiza sem localStorage, sem mostrar email', () => {
    const providerProps = {
      value: '',
    };
    customRender(<RecipeInProgress />, { providerProps }, pathname);
  });

  test('Se a página de profile renderiza sem localStorage, sem mostrar email', () => {
    localStorage.setItem('52977', JSON.stringify([]));
    const providerProps = {
      value: '',
    };
    customRender(<RecipeInProgress />, { providerProps }, pathname);
  });
});
