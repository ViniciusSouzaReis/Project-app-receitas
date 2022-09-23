import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './Api-Context/providers/UserProvider';
import SearchBar from './components/SearchBar';
import Login from './pages/Login';

function App() {
  return (
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
>>>>>>>>> Temporary merge branch 2
  );
}

export default App;
