import React, { useState } from 'react';
import perfilIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ props: { history } }) {
  const [filter, setFilter] = useState(false);

  return (
    <div>
      Header
      <button
        type="button"
        onClick={ () => history.push('/profile') }
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

export default Header;
