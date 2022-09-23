import React, { useState } from 'react';
import PropTypes from 'prop-types';
import perfilIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ props: { history: { push, location: { pathname } } } }) {
  const [filter, setFilter] = useState(false);

  const title = () => {
    switch (pathname) {
    case '/meals':
      return (<h2 data-testid="page-title">Meals</h2>);
    case '/drinks':
      return (<h2 data-testid="page-title">Drinks</h2>);
    case '/profile':
      return (<h2 data-testid="page-title">Profile</h2>);
    case '/done-recipes':
      return (<h2 data-testid="page-title">Done Recipes</h2>);
    case '/favorite-recipes':
      return (<h2 data-testid="page-title">Favorite Recipes</h2>);
    default:
      break;
    }
  };

  const containSearchButton = () => {
    switch (pathname) {
      case '/profile':
        return false;
      case '/done-recipes':
        return false;
      case '/favorite-recipes':
        return false;
      default:
        return true;
    }
  }

  return (
    <div>
      {title()}
      <button
        type="button"
        onClick={ () => push('/profile') }
      >
        <img src={ perfilIcon } data-testid="profile-top-btn" alt="profile" />
      </button>
      {containSearchButton() && (<button
        type="button"
        onClick={ () => setFilter(!filter) }
      >
        <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="search"
        />
      </button>)}
      {filter && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Header;
