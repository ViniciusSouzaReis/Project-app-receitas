import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

function BodyDetail({ imgUrl, nameRecipie, video }) {
  const { apiReturn } = useContext(RecipesContext);
  let arrayIgredients = [];

  for (let index = 0; index < 100; index += 1) {
    arrayIgredients = [...arrayIgredients, apiReturn[0][`strIngredient${index}`]];
  }

  console.log(arrayIgredients);

  return (
    <div
      className="card"
      // style={ { width: '18rem' } }
    >
      <img
        src={ imgUrl }
        className="card-img-top"
        alt={ nameRecipie }
        data-testid="recipe-photo"
        role="presentation"
      />
      <div className="card-body">
        <h2
          className="card-title"
          data-testid="recipe-title"
          role="presentation"
        >
          {nameRecipie}
        </h2>
        <h4 data-testid="recipe-category">{apiReturn[0].strCategory}</h4>
        <ul>
          {arrayIgredients.map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item}
            </li>
          ))}
        </ul>
        <p
          className="card-text"
          data-testid="instructions"
        >
          {apiReturn[0].strInstructions}
        </p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
}

BodyDetail.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  nameRecipie: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
};

export default BodyDetail;
