import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePromotion from './CreatePromotion';
import ViewPromotion from './ViewPromotion';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from './sharedComponents/Navbar';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/">
          <Navbar />
          <Route path="/create-promotion" component={CreatePromotion} />
          <Route path="/create-coupons" />
          <Route path="/analysis" />
          <Route exact path="/" component={Home} />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function NoMatch() {
  return <div>You have come to a place of nowhere! :(</div>;
}

export default App;
