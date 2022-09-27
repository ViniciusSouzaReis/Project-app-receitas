import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

function BodyDetail({ imgUrl, nameRecipie, video }) {
  const { apiReturn } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
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

  console.log(arrayIgredients);
  console.log(arrayMesures);
  console.log(arrayPath[1]);

  return (
    <div
      className="card"
      style={ { width: '90%' } }
    >
      <img
        src={ imgUrl }
        className="card-img-top"
        alt={ nameRecipie }
        data-testid="recipe-photo"
        role="presentation"
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
          ))}
        </ul>
        Instruções de preparo:
        <p
          className="card-text"
          data-testid="instructions"
        >
          {apiReturn[0].strInstructions}
        </p>
        {(video) && (
          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src={ `https://www.youtube.com/embed/${video}` }
              frameBorder="0"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              data-testid="video"
            />
          </div>
        )}
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
