import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function HorizontalCard() {
  const { location: { pathname } } = useHistory();
  const [objKey, setObjKey] = useState('');
  const [recipesArray, setRecipesArray] = useState([]);

  useEffect(() => {
    if (pathname === '/done-recipes') {
      setObjKey('doneRecipes');
    }
  }, []);

  useEffect(() => {
    if (objKey !== '') {
      const recipes = JSON.parse(localStorage.getItem(objKey));
      setRecipesArray(recipes);
    }
  }, [objKey]);

  return (
    <div>
      {recipesArray.length > 0
      && recipesArray
        .map(({ id, image, category, name, doneDate, tags, nationality }, index) => (
          <div key={ id }>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${nationality} - ${category}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
            <img
              src={ image }
              data-testid={ `${index}-horizontal-image` }
              alt="Recipe"
            />
            <img
              role="presentation"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
            <ul>
              {tags.map((tag) => (
                <li key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default HorizontalCard;
