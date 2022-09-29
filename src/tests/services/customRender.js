// Modelo de custom https://testing-library.com/docs/example-react-context/ somado ao modelo history da Trybe.
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import RecipesContext from '../../Api-Context/contexts/RecipesContext';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  const history = createMemoryHistory();
  return (
    render(
      <Router history={ history }>
        <RecipesContext.Provider { ...providerProps }>
          {ui}
        </RecipesContext.Provider>
      </Router>,
      renderOptions,
      history,
    )
  );
};

export default customRender;
