import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchFoodApiRequest from '../services/searchFoodApiRequest';
import CardRecipies from './CardRecipies';

let OK_FETCH = true;
const MAX_CARROUSEL = 6;

function RecomedationDetail() {
  const [recomedations, setRecomedations] = useState([]);
  const { location: { pathname } } = useHistory();
  const arrayPath = pathname.split('/');

  // console.log(recomedations[2].strMealThumb);

  async function apiFetchRecomedations(type, filter, paramFilter) {
    // if (!filter) filter = 'name';
    // if (!paramFilter) paramFilter = '';
    const URL = searchFoodApiRequest(type, filter, paramFilter);

    // try {
    const request = await fetch(URL);
    const response = await request.json();
    // console.log(URL);
    // } catch (e) {
    //   console.log(error);
    // }

    // console.log(arrayPath[1]);
    console.log(response);
    // console.log(URL);

    if (arrayPath[1] === 'drinks') {
      if (!response.meals) {
        setRecomedations(response);
      } else {
        setRecomedations(response.meals);
      }
    } else if (arrayPath[1] === 'meals') {
      if (!response.drinks) {
        setRecomedations(response);
      } else {
        setRecomedations(response.drinks);
      }
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
    console.log(recomedations);
    OK_FETCH = false;
  }, [arrayPath]);

  useEffect(() => () => { OK_FETCH = true; }, []);
  //
  return (
    <div style={ { display: 'flex', width: '100%', overflowX: 'scroll' } }>
      { (arrayPath[1] === 'drinks') ? (
        recomedations.map((
          { strMeal, idMeal, strMealThumb },
          index,
        ) => index < MAX_CARROUSEL && (
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
                idCard: 'recommendation-card', idTitle: 'recommendation-title' } }
            />
          </div>
        ))
      ) : (
        (arrayPath[1] === 'meals') && (
          recomedations.map((
            { strDrink, idDrink, strDrinkThumb },
            index,
          ) => index < MAX_CARROUSEL && (
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
                  idCard: 'recommendation-card', idTitle: 'recommendation-title' } }
              />
            </div>
          ))
        )
      )}
    </div>
  );
}

export default RecomedationDetail;
