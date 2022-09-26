import React, { useContext } from 'react';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import CardRecipies from '../components/CardRecipies';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes() {
  const { apiReturn } = useContext(RecipesContext);
  return (
    <div>
      <div><Header /></div>
      <main>
        <Categories />
        {apiReturn.length > 0 && <CardRecipies />}
      </main>
      <div><Footer /></div>
    </div>
  );
}

export default Recipes;
