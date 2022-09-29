import React, { useState } from 'react';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';

function DoneRecipes() {
  const [filter, setFilter] = useState('');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const handleClick = ({ target }) => {
    setFilter(target.name);
  };

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-all-btn"
          name=""
        >
          All
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-meal-btn"
          name="meal"
        >
          Meals
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-drink-btn"
          name="drink"
        >
          Drinks
        </button>
      </div>
      {doneRecipes && <HorizontalCard filter={ filter } />}
    </div>
  );
}

export default DoneRecipes;
