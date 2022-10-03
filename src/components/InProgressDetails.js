import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  addInProgressRecipes,
  saveInProgressRecipes } from '../services/inProgressRecipesLocalStorage';
import '../index.css';

const copy = require('clipboard-copy');

let IS_FAVE = false;

function InProgressDetails({ imgUrl, nameRecipie }) {
  const { apiReturn } = useContext(RecipesContext);
  const { push, location: { pathname } } = useHistory();
  const [clippedText, setClippedText] = useState(false);
  // const [newClass, setNewClass] = useState('');
  const [checkRender, setCheckRender] = useState(true);
  const [inProgress, setInProgress] = useState([]);
  const [indexToCompare, setIndexToCompare] = useState(0);
  const [renderCheck, setRenderCheck] = useState(true);
  const [isFave, setFaveSwitch] = useState(IS_FAVE);
  const arrayPath = pathname.split('/');
  let arrayIgredients = [];
  let arrayMesures = [];

  for (let index = 1; index < 100; index += 1) {
    if (apiReturn[0][`strIngredient${index}`]) {
      arrayIgredients = [...arrayIgredients, apiReturn[0][`strIngredient${index}`]];
      arrayMesures = [...arrayMesures, apiReturn[0][`strMeasure${index}`]];
    } else {
      break;
    }
  }

  useEffect(() => {
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
    setCheckRender(false);
    const recipeId = JSON.parse(localStorage.getItem(arrayPath[2]));
    if (recipeId) {
      setInProgress(recipeId);
    }
  }, []);

  useEffect(() => {
    const recipeId = JSON.parse(localStorage.getItem(arrayPath[2]));
    if (recipeId) {
      saveInProgressRecipes(arrayPath[2], inProgress);
    } else {
      saveInProgressRecipes(arrayPath[2], []);
    }
  }, [inProgress, arrayPath]);

  const handleClick = async (item) => {
    if (indexToCompare < arrayIgredients.length - 1) {
      setIndexToCompare((prev) => prev + 1);
    } else {
      setRenderCheck(false);
    }
    if (inProgress.some((inProgressItem) => inProgressItem === item)) {
      const newChecks = inProgress.filter((inProgressItem) => inProgressItem !== item);
      await setInProgress(newChecks);
    } else {
      setInProgress([...inProgress, item]);
    }
  };

  const handleFinishButton = () => {
    push('/done-recipes');
  };

  const handleShare = async () => {
    copy(`http://localhost:3000/${arrayPath[1]}/${arrayPath[2]}`);
    setClippedText(!clippedText);
  };

  const favoriteButton = () => {
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
    IS_FAVE = faveList.some((recipe) => recipe.id === newFave.id);

    if (IS_FAVE === false) {
      addInProgressRecipes('favoriteRecipes', newFave);
      setFaveSwitch(true);
    } else {
      faveList = faveList.filter((recipe) => recipe.id !== newFave.id);
      saveInProgressRecipes('favoriteRecipes', faveList);
      setFaveSwitch(false);
    }
  };

  return (
    <div
      className="card"
      style={ { width: '98%', marginTop: '5px' } }
    >
      <img
        src={ imgUrl }
        className="card-img-top"
        alt={ nameRecipie }
        data-testid="recipe-photo"
        role="presentation"
        style={ { height: '70vh' } }
      />
      <div className="card-body">
        <h5
          className="card-title"
          data-testid="recipe-title"
          role="presentation"
        >
          {nameRecipie}
        </h5>
        <h6
          data-testid="recipe-category"
          className="card-subtitle mb-2 text-muted"
        >
          {(arrayPath[1] === 'drinks')
            ? apiReturn[0].strAlcoholic : apiReturn[0].strCategory}
        </h6>
        Ingredientes:
        <ul>
          {arrayIgredients.map((item, index) => (
            <>
              <label
                htmlFor={ index }
                data-testid={ `${index}-ingredient-step` }
                key={ item }
              >
                Check Ingredients
                {' '}
                <input
                  type="checkbox"
                  id={ index }
                  onChange={ () => { handleClick(item); } }
                  key={ `${item}${index}` }
                  checked={ checkRender || inProgress
                    .some((inProgressItem) => inProgressItem === item) }
                />
              </label>
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { (item) && (
                  <span>
                    {item}
                    {' '}
                    .........
                    {' '}
                    {arrayMesures[index]}
                  </span>
                )}
              </li>
            </>
          ))}
        </ul>
        Instruções de preparo:
        <p
          className="card-text"
          data-testid="instructions"
        >
          {apiReturn[0].strInstructions}
        </p>
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
        {/* <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteButton }
        >
          Favorites
        </button> */}
        <img
          src={ isFave ? blackHeartIcon : whiteHeartIcon }
          alt="favoriteOrNot"
          role="presentation"
          data-testid="favorite-btn"
          onClick={ favoriteButton }
        />
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ handleFinishButton }
          disabled={ renderCheck }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

InProgressDetails.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  nameRecipie: PropTypes.string.isRequired,
};

export default InProgressDetails;
