import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InProgressDetails from '../components/InProgressDetails';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

function RecipeInProgress() {
  const { apiReturn, apiFetch } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const arrayPath = pathname.split('/');

  useEffect(() => {
    console.log(arrayPath[1]);
    if (arrayPath[1] === 'meals') {
      console.log(arrayPath[1]);
      apiFetch('meal', 'detail', arrayPath[2]);
    } else {
      apiFetch('cocktail', 'detail', arrayPath[2]);
    }
  }, []);

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
