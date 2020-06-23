import React from 'react';
import './App.css';
import Home from './Home';
import CreatePromotion from './CreatePromotion';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
