import React from 'react';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <h1>
            Welcome!
          </h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
