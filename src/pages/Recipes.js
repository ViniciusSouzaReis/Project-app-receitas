import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import CardRecipies from '../components/CardRecipies';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';

let OK_FETCH = true;

function Recipes() {
  const { apiReturn, apiFetch } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    if (OK_FETCH) {
      if (pathname === '/meals') { apiFetch('meal'); }
      if (pathname === '/drinks') { apiFetch('cocktail'); }
    }
    OK_FETCH = false;
  }, [apiFetch, pathname]);

  useEffect(() => () => { OK_FETCH = true; }, []);

  const maxCards = 12;

  return (
    <div>
      <div><Header /></div>
      <main>
        <Categories />
        {(apiReturn.length > 0 && pathname === '/meals')
          && apiReturn
            .filter((element, index) => index < maxCards)
            .map(({ strMeal, idMeal, strMealThumb }, index) => (
              <CardRecipies
                index={ index }
                key={ idMeal }
                urlImage={ strMealThumb }
                nameRecipie={ strMeal }
                id={ idMeal }
                type="meals"
                idTeste={ { idCard: 'recipe-card', idTitle: 'card-name' } }
              />))}
        {(apiReturn.length > 0 && pathname === '/drinks')
          && apiReturn
            .filter((element, index) => index < maxCards)
            .map(({ strDrink, idDrink, strDrinkThumb }, index) => (
              <CardRecipies
                index={ index }
                key={ idDrink }
                urlImage={ strDrinkThumb }
                nameRecipie={ strDrink }
                id={ idDrink }
                type="drinks"
                idTeste={ { idCard: 'recipe-card', idTitle: 'card-name' } }
              />))}
      </main>
      <div><Footer /></div>
    </div>
  );
}

export default Recipes;
