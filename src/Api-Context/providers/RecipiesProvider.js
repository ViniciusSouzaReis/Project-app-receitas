import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
import searchFoodApiRequest from '../../services/searchFoodApiRequest';

function RecipesProvider({ children }) {
  const [apiReturn, setApiReturn] = useState([]);

  const apiFetch = async (type, filter, paramFilter) => {
    const URL = searchFoodApiRequest(type, filter, paramFilter);
    console.log(URL);
    const request = await fetch(URL);
    const response = await request.json();
    if (type === 'meal') {
      setApiReturn(response.meals);
    } else {
      setApiReturn(response.drinks);
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
