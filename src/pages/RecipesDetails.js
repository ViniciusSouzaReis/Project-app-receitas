import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import BodyDetail from '../components/BodyDetail';
import RecomedationDetail from '../components/RecomedationDetail';

let OK_FETCH = true;

function RecipesDetails() {
  const { apiFetch, apiReturn } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const arrayPath = pathname.split('/');
  // console.log(arrayPath[1]);
  // console.log(apiReturn);
  // console.log(OK_FETCH);

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

  useEffect(() => () => { OK_FETCH = true; }, []);

  return (
    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
      {(apiReturn.length > 0) && (
        (arrayPath[1] === 'drinks')
          ? (
            <BodyDetail
              imgUrl={ apiReturn[0].strDrinkThumb }
              nameRecipie={ apiReturn[0].strDrink }
              video={ null }
            />
          )
          : (
            <BodyDetail
              imgUrl={ apiReturn[0].strMealThumb }
              nameRecipie={ apiReturn[0].strMeal }
              video={ apiReturn[0].strYoutube }
            />
          )
      )}
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', marginBottom: '0px', marginTop: '610px' } }
        id="btn-start-recipes"
      >
        Start Recipe
      </button>

      <RecomedationDetail />
    </div>
  );
}

export default RecipesDetails;
