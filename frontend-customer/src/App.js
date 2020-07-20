import React from 'react';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import PromotionDetails from './PromotionDetails'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/promotions/:id" component={PromotionDetails} />
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

function NoMatch() {
  return <div>You have come to a place of nowhere! :(</div>
}

export default App;
