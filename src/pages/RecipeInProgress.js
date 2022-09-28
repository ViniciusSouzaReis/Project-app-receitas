import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InProgressDetails from '../components/InProgressDetails';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

let OK_FETCH = true;
function RecipeInProgress() {
  const { apiReturn, apiFetch } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const arrayPath = pathname.split('/');

  useEffect(() => {
    if (OK_FETCH) {
      if (arrayPath[1] === 'drinks') {
        apiFetch('cocktail', 'detail', arrayPath[2]);
      } else {
        apiFetch('meal', 'detail', arrayPath[2]);
      }
    }
    OK_FETCH = false;
  }, [apiFetch, arrayPath]);

  return (
    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
      {(apiReturn.length > 0) && (
        (arrayPath[1] === 'drinks')
          ? (
            <InProgressDetails
              imgUrl={ apiReturn[0].strDrinkThumb }
              nameRecipie={ apiReturn[0].strDrink }
            />
          )
          : (
            <InProgressDetails
              imgUrl={ apiReturn[0].strMealThumb }
              nameRecipie={ apiReturn[0].strMeal }
            />
          )
      )}
    </div>
  );
}

export default RecipeInProgress;
