import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
import searchFoodApiRequest from '../../services/searchFoodApiRequest';

function RecipesProvider({ children }) {
  const [apiReturn, setApiReturn] = useState([]);

  const apiFetch = async (type, filter, paramFilter) => {
    const URL = searchFoodApiRequest(type, filter, paramFilter);
    console.log(URL);
    try {
      const request = await fetch(URL);
      const response = await request.json();
      console.log(response);
      if (type === 'meal') {
        if (response.meals === null) {
          setApiReturn(response);
        } else {
          setApiReturn(response.meals);
        }
      } else if (type === 'cocktail') {
        if (response.drinks === null) {
          setApiReturn(response);
        } else {
          setApiReturn(response.drinks);
        }
      }
    } catch (e) {
      console.log(error);
    }
  };

  const contextValues = useMemo(() => ({
    apiReturn,
    setApiReturn,
    apiFetch,
  }), [apiReturn]);

  return (
    <RecipesContext.Provider value={ contextValues }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
