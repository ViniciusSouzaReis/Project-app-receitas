import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function HorizontalCard({ filter }) {
  const { push, location: { pathname } } = useHistory();
  const [objKey, setObjKey] = useState('');
  const [recipesArray, setRecipesArray] = useState([]);
  const [clippedText, setClippedText] = useState(false);

  useEffect(() => {
    if (pathname === '/done-recipes') {
      setObjKey('doneRecipes');
    } else if (pathname === '/favorite-recipes') {
      setObjKey('favoriteRecipes');
    }
  }, [pathname]);

  useEffect(() => {
    if (objKey !== '') {
      const recipes = JSON.parse(localStorage.getItem(objKey));
      if (filter !== '') {
        const recipesFiltered = recipes.filter(({ type }) => type === filter);
        setRecipesArray(recipesFiltered);
      } else {
        setRecipesArray(recipes);
      }
    }
  }, [objKey, filter]);

  const handleShare = async (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setClippedText(!clippedText);
  };

  return (
    <div>
      {recipesArray.length > 0
      && recipesArray.map(({
        id, image, category, name, doneDate, tags, nationality, type, alcoholicOrNot,
      }, index) => (
        <div key={ id }>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {type === 'meal'
              ? `${nationality} - ${category}` : `${category} - ${alcoholicOrNot}`}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
            role="presentation"
            onClick={ () => push(`/${type}s/${id}`) }
          >
            {name}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
          <img
            src={ image }
            data-testid={ `${index}-horizontal-image` }
            role="presentation"
            onClick={ () => push(`/${type}s/${id}`) }
            alt="Recipe"
          />
          <img
            role="presentation"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share"
            onClick={ () => handleShare(type, id) }
          />
          {(pathname === '/done-recipes') && (
            <ul>
              {tags.map((tag) => (
                <li key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </li>
              ))}
            </ul>

          )}
          {(clippedText) && (
            <p>Link copied!</p>
          )}
        </div>
      ))}
    </div>
  );
}

HorizontalCard.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default HorizontalCard;
