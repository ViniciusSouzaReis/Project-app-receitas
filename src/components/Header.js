import React, { useState } from 'react';
import PropTypes from 'prop-types';
import perfilIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ props: { history: { push, location: { pathname } } } }) {
  const [filter, setFilter] = useState(false);

  const title = () => {
    switch (pathname) {
    case '/':
      return (<h2>Login</h2>);
    case '/profile':
      return (<h2 data-testid="page-title">Perfil</h2>);
    default:
      break;
    }
  };

  return (
    <div>
      {title()}
      <button
        type="button"
        onClick={ () => push('/profile') }
      >
        <img src={ perfilIcon } data-testid="profile-top-btn" alt="profile" />
      </button>
      <button
        type="button"
        onClick={ () => setFilter(!filter) }
      >
        <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="search"
        />
      </button>

      {filter && <p>Busca</p>}
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
