import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Logout(props) {
  const [isLoggedOut, setLoggedOut] = useState(false);

  if (isLoggedOut) {
    return <Redirect to="/login" />;
  }

  function logout() {
    localStorage.clear('Authorization-Token');
    delete axios.defaults.headers.common['Authorization']; 
    setLoggedOut(true);
  }

  return (
    <Button variant="contained" color="primary" onClick={logout}>
      Logout
    </Button>
  );
}

export default Logout;
