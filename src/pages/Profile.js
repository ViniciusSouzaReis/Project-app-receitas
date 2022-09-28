import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const { push } = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) { setEmail(user.email); }
  }, []);

  const logout = () => {
    // localStorage.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('drinksToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    push('/');
  };

  return (
    <div>
      <div><Header /></div>
      <p data-testid="profile-email">{email}</p>
      <nav>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </nav>
      <div><Footer /></div>
    </div>
  );
}

export default Profile;
