import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const { push } = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => push('/drinks') }
      >
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drinks" />
      </button>
      <button
        type="button"
        onClick={ () => push('/meals') }
      >
        <img src={ mealIcon } data-testid="meals-bottom-btn" alt="drinks" />
      </button>
    </footer>
  );
}

export default Footer;
