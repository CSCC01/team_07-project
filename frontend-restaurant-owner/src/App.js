import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './sharedComponents/Navbar';
import CreatePromotion from './CreatePromotion';
import Home from './Home';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/create-promotion">
          <Navbar />
          <CreatePromotion />
        </Route>
        <Route path="/other">
          <Navbar />
          <Other />
        </Route>
        <Route path="/">
          <Navbar />
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Other() {
  return <h2>Made by ByteMe</h2>;
}

export default App;
