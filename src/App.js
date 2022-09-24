import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './Api-Context/providers/UserProvider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/meals/:id" component={ RecipesDetails } />
          <Route exact path="/drinks/:id" component={ RecipesDetails } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
