import React from 'react';
import { Redirect } from 'react-router-dom';
import ViewPromotion from '../ViewPromotion';

function Home() {
  if (localStorage.getItem('Authorization-Token') === null) return <Redirect to="/login" />;
  return (
    <div>
      <ViewPromotion />
    </div>
  );
}

export default Home;
