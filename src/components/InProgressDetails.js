import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import '../index.css';

function InProgressDetails({ imgUrl, nameRecipie }) {
  const { apiReturn } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const [newClass, setNewClass] = useState('');
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

  const handleClick = () => {
    setNewClass('checkboxDecoration');
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
                htmlFor={ `id${index}` }
                data-testid={ `${index}-ingredient-step` }
                key={ item }
              >
                <input
                  type="checkbox"
                  id={ `id${index}` }
                  onClick={ handleClick }
                  key={ `${item}${index}` }
                />
              </label>
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { (item) && (
                  <span className={ newClass }>
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
      </div>
    </div>
  );
}

InProgressDetails.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  nameRecipie: PropTypes.string.isRequired,
};

export default InProgressDetails;
