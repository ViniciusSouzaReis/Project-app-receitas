import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './Api-Context/providers/UserProvider';
import Login from './pages/Login';

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <UserProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Login } />
          <Route exact path="/drinks" component={ Login } />
          <Route exact path="/meals/:id" component={ Login } />
          <Route exact path="/drinks/:id" component={ Login } />
          <Route exact path="/meals/:id/in-progress" component={ Login } />
          <Route exact path="/drinks/:id/in-progress" component={ Login } />
          <Route exact path="/profile" component={ Login } />
          <Route exact path="/done-recipes" component={ Login } />
          <Route exact path="/favorite-recipes" component={ Login } />
        </Switch>
      </UserProvider>
    </BrowserRouter>
=======
    <div className="meals">
      <span className="logo">TRYBE 2.0</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
>>>>>>> origin
  );
}

export default App;
