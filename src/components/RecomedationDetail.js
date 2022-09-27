import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchFoodApiRequest from '../services/searchFoodApiRequest';

let OK_FETCH = true;

function RecomedationDetail() {
  const [recomedations, setRecomedations] = useState([]);
  const { location: { pathname } } = useHistory();
  const arrayPath = pathname.split('/');

  console.log(recomedations);

  async function apiFetchRecomedations(type, filter, paramFilter) {
    const URL = searchFoodApiRequest(type, filter, paramFilter);

    try {
      const request = await fetch(URL);
      const response = await request.json();

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
        apiFetchRecomedations('cocktail', 'name', '');
      } else {
        apiFetchRecomedations('meal', 'name', '');
      }
    }
    OK_FETCH = false;
  }, [arrayPath]);

  useEffect(() => () => { OK_FETCH = true; }, []);

  return (
    <div>RecomedationDetail</div>
  );
}

export default RecomedationDetail;
