import React from 'react';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import PromotionDetails from './PromotionDetails'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/promotions/:id">
          <PromotionDetails />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function NoMatch() {
  return <div>You have come to a place of nowhere! :(</div>
}

export default App;
