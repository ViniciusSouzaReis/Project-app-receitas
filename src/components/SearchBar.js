import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          name="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          name="radio"
          data-testid="name-search-radio"
          id="name"
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          name="radio"
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Filter
      </button>
    </div>
  );
}

export default SearchBar;
