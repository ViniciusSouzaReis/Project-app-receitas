import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import CardRecipies from '../components/CardRecipies';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes() {
  const { apiReturn, apiFetch } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    if (pathname === '/meals') { apiFetch('meal'); }
    if (pathname === '/drinks') { apiFetch('cocktail'); }
  }, []);

  return (
    <div>
      <div><Header /></div>
      <main>
        <Categories />
        {(apiReturn.length > 0 && pathname === '/meals')
          && apiReturn
            .map(({ strMeal, idMeal, strMealThumb }, index) => (
              <CardRecipies
                index={ index }
                key={ idMeal }
                urlImage={ strMealThumb }
                nameRecipie={ strMeal }
                id={ idMeal }
                type="meals"
              />))}
        {(apiReturn.length > 0 && pathname === '/drinks' && apiReturn[0].strDrink === undefined)
          && apiReturn
            .map(({ strDrink, idDrink, strDrinkThumb }, index) => (
              <CardRecipies
                index={ index }
                key={ idDrink }
                urlImage={ strDrinkThumb }
                nameRecipie={ strDrink }
                id={ idDrink }
                type="drinks"
              />))}
      </main>
      <div><Footer /></div>
    </div>
  );
}

export default Recipes;
