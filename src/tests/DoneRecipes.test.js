import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import customRender from './services/customRender';
import DoneRecipes from '../pages/DoneRecipes';

const pathname = '/done-recipes';

const localStorageMock = [{
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

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(localStorageMock));
});

afterEach(() => {
  localStorage.clear();
});

describe('Teste da página de DoneRecipes', () => {
  test('Se a página de Favoritos renderiza com o titulo Done Recipes, mesmo sem nada', async () => {
    const providerProps = {
      value: '',
    };
    customRender(<DoneRecipes />, { providerProps }, pathname);

    const corbaName = screen.getByText('Done Recipes');
    expect(corbaName).toBeInTheDocument();
  });

  test('Se a página de Favoritos renderiza com os cards', async () => {
    const providerProps = {
      value: '',
    };
    customRender(<DoneRecipes />, { providerProps }, pathname);

    const penneName = screen.getByText('Spicy Arrabiata Penne');
    expect(penneName).toBeInTheDocument();

    const burekName = screen.getByText('Burek');
    expect(burekName).toBeInTheDocument();

    const aquamarineName = screen.getByText('Aquamarine');
    expect(aquamarineName).toBeInTheDocument();
  });

  test('Se a página de Favoritos renderiza com o filtros funcionais', async () => {
    const providerProps = {
      value: '',
    };
    customRender(<DoneRecipes />, { providerProps }, pathname);

    const itensBeforeFiltered = await screen.findAllByAltText('Recipe');
    expect(itensBeforeFiltered.length).toBe(3);

    const filterDrinksButton = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(filterDrinksButton);

    const itensDrinkFiltered = await screen.findAllByAltText('Recipe');
    expect(itensDrinkFiltered.length).toBe(1);

    const filterAllButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(filterAllButton);

    const itensAllFiltered = await screen.findAllByAltText('Recipe');
    expect(itensAllFiltered.length).toBe(3);

    const filterMealsButton = screen.getByRole('button', { name: 'Meals' });
    userEvent.click(filterMealsButton);

    const itensMealsFiltered = await screen.findAllByAltText('Recipe');
    expect(itensMealsFiltered.length).toBe(2);

    userEvent.click(filterAllButton);
    const itensAllFilteredAgain = await screen.findAllByAltText('Recipe');
    expect(itensAllFilteredAgain.length).toBe(3);
  });
});
