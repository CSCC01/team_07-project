import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreatePromotion from './CreatePromotion';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/create-promotion">
            <CreatePromotion />
          </Route>
          <Route path="/other">
            <Other />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Other() {
  return <h2>Made by ByteMe</h2>;
}

export default App;
