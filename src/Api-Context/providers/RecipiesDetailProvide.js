import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipiesDetailContext from '../contexts/RecipesContext';
import searchFoodApiRequest from '../../services/searchFoodApiRequest';

function RecipesDetailProvider({ children }) {
  const [apiReturn, setApiReturn] = useState([]);

  const apiFetch = async (type, filter, paramFilter) => {
    const URL = searchFoodApiRequest(type, filter, paramFilter);
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
    <RecipiesDetailContext.Provider value={ contextValues }>
      {children}
    </RecipiesDetailContext.Provider>
  );
}

RecipesDetailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesDetailProvider;
