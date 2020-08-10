import React from 'react';
import { Redirect } from 'react-router-dom';
import ViewPromotion from '../ViewPromotion';

function Home() {
  if (localStorage.getItem('Authorization-Token') === null) return <Redirect to="/login" />;
  return (
    <div>
      {/* View Promotion Page is the home page */}
      <ViewPromotion />
    </div>
  );
}

export default Home;
