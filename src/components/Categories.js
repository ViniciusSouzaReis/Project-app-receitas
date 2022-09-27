import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Api-Context/contexts/RecipesContext';

function Categories() {
  const { location: { pathname } } = useHistory();
  const [filterSelected, setFilterSelected] = useState('all');
  const [categories, setCategories] = useState([]);
  const { apiFetch } = useContext(RecipesContext);

  useEffect(() => {
    const fetchApiCategory = async (type) => {
      let URL = '';
      let typeReturn = '';
      if (type === '/meals') {
        URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        typeReturn = 'meals';
      } else {
        URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        typeReturn = 'drinks';
      }
      const response = await fetch(URL);
      const categoriesApi = await response.json();
      const numberCategoryMax = 5;
      const categoriesFive = categoriesApi[typeReturn]
        .filter((element, index) => index < numberCategoryMax);
      setCategories(categoriesFive);
    };
    fetchApiCategory(pathname);
  }, [pathname]);

  const handleClick = (name) => {
    if ((pathname === '/meals' && name === filterSelected)
    || (pathname === '/meals' && name === 'all')) {
      setFilterSelected('all');
      apiFetch('meal');
    } else if ((pathname === '/drinks' && name === filterSelected)
    || (pathname === '/drinks' && name === 'all')) {
      setFilterSelected('all');
      apiFetch('cocktail');
    } else if (pathname === '/meals') {
      setFilterSelected(name);
      apiFetch('meal', 'categories', name);
    } else if (pathname === '/drinks') {
      setFilterSelected(name);
      apiFetch('cocktail', 'categories', name);
    }
  };

  return (
    <ul>
      {categories.map((category) => (
        <li
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          role="presentation"
          name={ category.strCategory }
          onClick={ () => handleClick(category.strCategory) }
        >
          {category.strCategory}
        </li>))}
      <li
        data-testid="All-category-filter"
        role="presentation"
        onClick={ () => handleClick('all') }
      >
        All
      </li>
    </ul>
  );
}

export default Categories;
