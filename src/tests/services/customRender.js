// Modelo de custom https://testing-library.com/docs/example-react-context/ somado ao modelo history da Trybe.
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesContext from '../../Api-Context/contexts/RecipesContext';

const customRender = (ui, { providerProps, ...renderOptions }, pathname) => {
  const history = createMemoryHistory();
  history.location.pathname = pathname;
  return (
    { ...render(
      <RecipesContext.Provider { ...providerProps }>
        <Router history={ history }>
          {ui}
        </Router>
      </RecipesContext.Provider>,
    ),
    renderOptions,
    history }
  );
};

export default customRender;
