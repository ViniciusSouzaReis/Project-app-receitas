import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

function SearchBar() {
  const [radioButton, setRadioButton] = useState('');
  const [inputText, setInputText] = useState('');
  // const [apiReturn, setApiReturn] = useState({});
  const { location: { pathname } } = useHistory();
  const { apiFetch, apiReturn } = useContext(RecipesContext);

  const handleChange = ({ target: { id } }) => {
    setRadioButton(id);
  };

  const handleChangeInput = ({ target: { value } }) => {
    setInputText(value);
  };

  const foodApiRequest = async (type) => {
    if (radioButton === 'first-letter' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      apiFetch(type, radioButton, inputText);
    }
  };

  const handleClick = () => {
    if (pathname === '/meals') {
      foodApiRequest('meal');
    } else if (pathname === '/drinks') {
      foodApiRequest('cocktail');
    }
  };

  console.log(apiReturn);

  return (
    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          name="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          name="radio"
          data-testid="name-search-radio"
          id="name"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          name="radio"
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="input-text">
        Search:
        <input
          name="input-text"
          value={ inputText }
          type="text"
          data-testid="search-input"
          id="input-text"
          onChange={ (e) => handleChangeInput(e) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Filter
      </button>
    </div>
  );
}

export default SearchBar;
