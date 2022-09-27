import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchFoodApiRequest from '../services/searchFoodApiRequest';
import CardRecipies from './CardRecipies';

let OK_FETCH = true;

function RecomedationDetail() {
  const [recomedations, setRecomedations] = useState([]);
  const { location: { pathname } } = useHistory();
  const arrayPath = pathname.split('/');

  // console.log(recomedations[2].strMealThumb);

  async function apiFetchRecomedations(type, filter, paramFilter) {
    const URL = searchFoodApiRequest(type, filter, paramFilter);

    try {
      const request = await fetch(URL);
      const response = await request.json();
      // console.log(URL);

      if (type === 'meal') {
        if (response.meals === null) {
          setRecomedations(response);
        } else {
          setRecomedations(response.meals);
        }
      } else if (type === 'cocktail') {
        if (response.drinks === null) {
          setRecomedations(response);
        } else {
          setRecomedations(response.drinks);
        }
      }
    } catch (e) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (OK_FETCH) {
      if (arrayPath[1] === 'drinks') {
        apiFetchRecomedations('meal', 'name', '');
      } else {
        apiFetchRecomedations('cocktail', 'name', '');
      }
    }
    OK_FETCH = false;
  }, [arrayPath]);

  useEffect(() => () => { OK_FETCH = true; }, []);
  //

  return (
    <div style={ { display: 'flex', width: '100%', overflowX: 'scroll' } }>
      { (arrayPath[1] === 'drinks') ? (
        recomedations.map(({ strMeal, idMeal, strMealThumb }, index) => (
          <div key={ index }>
            <CardRecipies
              index={ index }
              key={ idMeal }
              width="50vw"
              urlImage={ strMealThumb }
              nameRecipie={ strMeal }
              id={ idMeal }
              type="meals"
              idTeste={ {
                idCcard: 'recommendation-card', idTtitle: 'recommendation-title' } }
            />
          </div>
        ))
      ) : (
        recomedations.map(({ strDrink, idDrink, strDrinkThumb }, index) => (
          <div key={ index }>
            <CardRecipies
              index={ index }
              key={ idDrink }
              width="50vw"
              urlImage={ strDrinkThumb }
              nameRecipie={ strDrink }
              id={ idDrink }
              type="drinks"
              idTeste={ {
                idCcard: 'recommendation-card', idTtitle: 'recommendation-title' } }
            />
          </div>
        ))
      )}
    </div>
  );
}

export default RecomedationDetail;
