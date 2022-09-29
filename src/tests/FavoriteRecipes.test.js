import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import customRender from './services/customRender';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const pathname = '/favorite-recipes';

document.execCommand = jest.fn().mockResolvedValue('');

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

const localStorageMock = [
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

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
});

afterEach(() => {
  localStorage.clear();
});

describe('Teste da página de FavoriteRecipes', () => {
  test('Se a página de Favoritos renderiza com o titulo Favorite Recipes, mesmo sem nada', async () => {
    const providerProps = {
      value: '',
    };
    customRender(<FavoriteRecipes />, { providerProps }, pathname);

    const title = screen.getByText('Favorite Recipes');
    expect(title).toBeInTheDocument();
  });

  test('Se a página de Favoritos renderiza com os cards', async () => {
    const providerProps = {
      value: '',
    };
    customRender(<FavoriteRecipes />, { providerProps }, pathname);

    const corbaName = screen.getByText('Corba');
    expect(corbaName).toBeInTheDocument();

    const burekName = screen.getByText('Burek');
    expect(burekName).toBeInTheDocument();

    const ggName = screen.getByText('GG');
    expect(ggName).toBeInTheDocument();
  });

  test('Se a página de Favoritos renderiza com o filtros funcionais', async () => {
    const providerProps = {
      value: '',
    };
    customRender(<FavoriteRecipes />, { providerProps }, pathname);

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

  test('Se a remove um favorito', async () => {
    const providerProps = {
      value: '',
    };
    customRender(<FavoriteRecipes />, { providerProps }, pathname);

    const itensBeforeRemove = await screen.findAllByAltText('Recipe');
    expect(itensBeforeRemove.length).toBe(3);

    const buttonFavorite = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(buttonFavorite);

    const itensAfterRemove = await screen.findAllByAltText('Recipe');
    expect(itensAfterRemove.length).toBe(2);
  });

  test('Se a redireciona ao clicar na imagem', async () => {
    const providerProps = {
      value: '',
    };
    const { history } = customRender(<FavoriteRecipes />, { providerProps }, pathname);

    const path = history.location.pathname;
    expect(path).toBe(pathname);

    const itensBeforeRemove = await screen.findAllByAltText('Recipe');
    expect(itensBeforeRemove.length).toBe(3);

    userEvent.click(itensBeforeRemove[0]);

    const nemPath = history.location.pathname;
    expect(nemPath).toBe('/drinks/15997');
  });

  test('Se a redireciona ao clicar na imagem', async () => {
    const providerProps = {
      value: '',
    };
    const { history } = customRender(<FavoriteRecipes />, { providerProps }, pathname);

    const path = history.location.pathname;
    expect(path).toBe('/favorite-recipes');

    const itensBeforeRemove = await screen.findAllByAltText('Recipe');
    expect(itensBeforeRemove.length).toBe(3);

    const itemName = await screen.getByText('GG');
    expect(itemName.innerHTML).toBe('GG');
    userEvent.click(itemName);

    const nemPath = history.location.pathname;
    expect(nemPath).toBe('/drinks/15997');
  });

  test('Se o botão share funciona', async () => {
    const providerProps = {
      value: '',
    };

    jest.spyOn(navigator.clipboard, 'writeText');

    customRender(<FavoriteRecipes />, { providerProps }, pathname);

    const shareButton = await screen.getAllByAltText('share');
    expect(shareButton[0]).toHaveAttribute('src', 'shareIcon.svg');
    userEvent.click(shareButton[0]);

    const shareText = await screen.findAllByText('Link copied!');
    expect(shareText[0]).toBeInTheDocument();
  });
});
