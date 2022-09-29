import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import BodyDetail from '../components/BodyDetail';
import RecomedationDetail from '../components/RecomedationDetail';
import shareIcon from '../images/shareIcon.svg';
import {
  readInProgressRecipes,
  addInProgressRecipes,
  saveInProgressRecipes } from '../services/inProgressRecipesLocalStorage';
// import { addInProgressRecipes } from '../services/inProgressRecipesLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

let OK_FETCH = true;
let IS_FAVE = false;
const IN_PROGRESS_RECIPES = 'inProgressRecipes';
const DONE_RECIPES = 'doneRecipes';
const copy = require('clipboard-copy');

function RecipesDetails() {
  const { apiFetch, apiReturn } = useContext(RecipesContext);
  const { push, location: { pathname } } = useHistory();
  const [storageInProgress, setInProgress] = useState([]);
  const [doneStorage, setDoneStorage] = useState([]);
  const [existInProgress, setExistInProgress] = useState(false);
  const [existDoneRecipe, setExistDoneRecipe] = useState(false);
  const [clippedText, setClippedText] = useState(false);
  const [isFave, setFaveSwitch] = useState(IS_FAVE);
  const arrayPath = pathname.split('/');

  // console.log(arrayPath[1]);
  // console.log(apiReturn);
  // console.log(OK_FETCH);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))) {
      localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
    if (!JSON.parse(localStorage.getItem(DONE_RECIPES))) {
      localStorage.setItem(DONE_RECIPES, JSON.stringify([]));
    }
    setInProgress(readInProgressRecipes(IN_PROGRESS_RECIPES));
    setDoneStorage(readInProgressRecipes(DONE_RECIPES));
  }, []);

  useEffect(() => {
    // tentar mudar a cor do coraçãozinho
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const faveList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (apiReturn[0] !== undefined) {
      if (arrayPath[1] === 'meals') {
        setFaveSwitch(faveList.some((recipe) => recipe.id === apiReturn[0].idMeal));
      } else {
        setFaveSwitch(faveList.some((recipe) => recipe.id === apiReturn[0].idDrink));
      }
    }
  }, [apiReturn, arrayPath]);

  useEffect(() => {
    const compareRecipes = () => {
      if (doneStorage.length > 0) {
        // setExistDoneRecipe(doneStorage.some((element) => element.id === arrayPath[2]));
      }
    };
    const compareInProgress = () => {
      const { drinks, meals } = storageInProgress;
      if (meals) {
        const meal = Object.keys(meals);
        if (arrayPath[1] === 'meals') {
          setExistInProgress(meal.some((element) => element === arrayPath[2]));
        }
      }
      if (drinks) {
        const drink = Object.keys(drinks);
        if (arrayPath[1] === 'drinks') {
          setExistInProgress(drink.some((element) => element === arrayPath[2]));
        }
      }
    };
    compareRecipes();
    compareInProgress();
  }, [arrayPath, doneStorage, storageInProgress]);

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

  const handleClick = () => {
    push(`${pathname}/in-progress`);
  };

  const favoriteButton = () => {
    // if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    //   localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    // }
    let newFave = {};
    if (arrayPath[1] === 'meals') {
      newFave = {
        id: apiReturn[0].idMeal,
        type: 'meal',
        nationality: apiReturn[0].strArea,
        category: apiReturn[0].strCategory ? apiReturn[0].strCategory : '',
        alcoholicOrNot: '',
        name: apiReturn[0].strMeal,
        image: apiReturn[0].strMealThumb,
      };
    } else {
      newFave = {
        id: apiReturn[0].idDrink,
        type: 'drink',
        nationality: apiReturn[0].strArea ? apiReturn[0].strArea : '',
        category: apiReturn[0].strCategory ? apiReturn[0].strCategory : '',
        alcoholicOrNot: apiReturn[0].strAlcoholic ? apiReturn[0].strAlcoholic : '',
        name: apiReturn[0].strDrink,
        image: apiReturn[0].strDrinkThumb,
      };
    }

    let faveList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // console.log(faveList);
    IS_FAVE = faveList.some((recipe) => recipe.id === newFave.id);
    // setFaveSwitch(true);
    // console.log('favorito?:', IS_FAVE);
    if (IS_FAVE === false) {
      addInProgressRecipes('favoriteRecipes', newFave);
      setFaveSwitch(true);
    } else {
      faveList = faveList.filter((recipe) => recipe.id !== newFave.id);
      saveInProgressRecipes('favoriteRecipes', faveList);
      setFaveSwitch(false);
    }
    // setFaveSwitch(faveList.some((recipe) => recipe.id === newFave.id));
  };

  const handleShare = async () => {
    copy(`http://localhost:3000${pathname}`);
    setClippedText(!clippedText);
  };

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
      {(!existDoneRecipe) && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', marginBottom: '0px', marginTop: '610px' } }
          id="btn-start-recipes"
          onClick={ handleClick }
        >
          {(existInProgress) ? ('Continue Recipe') : ('Start Recipe')}
        </button>
      )}
      {(clippedText) && (
        <p>Link copied!</p>
      )}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          alt="share"
        />
      </button>
      <img
        src={ isFave ? blackHeartIcon : whiteHeartIcon }
        alt="favoriteOrNot"
        role="presentation"
        data-testid="favorite-btn"
        onClick={ favoriteButton }
      />
      {/* <button
        type="button"

        onClick={ }
      >
        Favorites
      </button> */}
      <RecomedationDetail />
    </div>
  );
}

export default RecipesDetails;
