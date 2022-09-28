import React, { useState } from 'react';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const handleClick = ({ target }) => {
    if (target.innerText === 'Meals') {
      setFilter('meal');
    } else if (target.innerText === 'Drinks') {
      setFilter('drink');
    } else {
      setFilter('');
    }
  };

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {favoriteRecipes && <HorizontalCard filter={ filter } />}
    </div>
  );
}

export default FavoriteRecipes;
