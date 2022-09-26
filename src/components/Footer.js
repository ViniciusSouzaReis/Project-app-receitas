import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const { setApiReturn } = useContext(RecipesContext);
  const { push } = useHistory();

  const handleClick = (url) => {
    setApiReturn([]);
    push(url);
  };

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => handleClick('/drinks') }
      >
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drinks" />
      </button>
      <button
        type="button"
        onClick={ () => handleClick('/meals') }
      >
        <img src={ mealIcon } data-testid="meals-bottom-btn" alt="drinks" />
      </button>
    </footer>
  );
}

export default Footer;
