import React from 'react';
import Logout from './Logout';
import { Redirect } from 'react-router-dom';

function Home() {
  if (localStorage.getItem('Authorization-Token') === null) return <Redirect to="/login" />;
  return (
    <div>
      <p>Welcome Home!</p>
      <Logout />
    </div>
  );
}

export default Home;
