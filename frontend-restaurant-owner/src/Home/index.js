import React from 'react';
import { Redirect } from 'react-router-dom';

function Home() {
  if (localStorage.getItem('Authorization-Token') === null) return <Redirect to="/login" />;
  return <p>Welcome Home!</p>;
}

export default Home;
