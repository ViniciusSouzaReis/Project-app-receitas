import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchFoodApiRequest from '../services/searchFoodApiRequest';
import searchDrinkApiRequest from '../services/searchDrinkApiRequest';

function SearchBar() {
  const [radioButton, setRadioButton] = useState('');
  const [inputText, setInputText] = useState('');
  const [apiReturn, setApiReturn] = useState({});
  const { location: { pathname } } = useHistory();

  const handleChange = ({ target: { id } }) => {
    setRadioButton(id);
  };

  const handleChangeInput = ({ target: { value } }) => {
    setInputText(value);
  };

  const foodApiRequest = async () => {
    if (radioButton === 'first-letter' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const request = await fetch(searchFoodApiRequest(radioButton, inputText));
      const response = await request.json();
      setApiReturn(response);
    }
  };

  const drinkApiRequest = async () => {
    if (radioButton === 'first-letter' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const request = await fetch(searchDrinkApiRequest(radioButton, inputText));
      const response = await request.json();
      setApiReturn(response);
    }
  };

  const handleClick = () => {
    if (pathname === '/meals') {
      foodApiRequest();
    } else if (pathname === '/drinks') {
      drinkApiRequest();
    }
  };

  console.log(apiReturn);
  console.log(radioButton);
  console.log(pathname);

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
