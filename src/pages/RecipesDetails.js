import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

let OK_FETCH = true;

function RecipesDetails() {
  // const { apiReturn, apiFetch } = useContext(RecipiesDetailContext);
  const { apiFetch, apiReturn } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const arrayPath = pathname.split('/');
  console.log(arrayPath);
  console.log(apiReturn);

  useEffect(() => {
    if (OK_FETCH) {
      if (arrayPath[1] === 'drinks') {
        apiFetch('cocktail', 'detail', arrayPath[2]);
      } else {
        apiFetch('meal', 'detail', arrayPath[2]);
      }
      OK_FETCH = false;
    }
  }, [apiFetch, arrayPath]);

  return (
    <div>RecipesDetails</div>
  );
}

export default RecipesDetails;
