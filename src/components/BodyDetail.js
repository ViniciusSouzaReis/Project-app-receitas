import React, { useContext } from 'react';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

function BodyDetail({ imgUrl, nameRecipie }) {
  const { apiReturn } = useContext(RecipesContext);
  let arrayIgredients = [];

  for (let index = 0; index < 16; index += 1) {
    arrayIgredients = [...arrayIgredients, apiReturn[0][`strIngredient${index}`]];
  }

  console.log(arrayIgredients);

  return (
    <div
      className="card"
      style={ { width: '18rem' } }
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
        {/* <p className="card-text">{descRecipie}</p> */}
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
}

export default BodyDetail;
