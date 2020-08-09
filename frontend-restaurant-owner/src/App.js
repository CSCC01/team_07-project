import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePromotion from './CreatePromotion';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Navbar from './sharedComponents/Navbar';
import NavBarUpdated from './sharedComponents/NavBarUpdated';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/">
          <NavBarUpdated />
          {/* <Route path="/view-promotion" component={ViewPromotion} /> */}
          <Route path="/create-promotion" component={CreatePromotion} />
          {/* <Route path="/create-coupons" />
          <Route path="/analysis" /> */}
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
