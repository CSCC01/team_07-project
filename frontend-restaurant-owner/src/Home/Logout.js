import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

function Logout(props) {
  const [isLoggedOut, setLoggedOut] = useState(false);

  if (isLoggedOut) {
    return <Redirect to="/login" />;
  }

  function logout() {
    localStorage.clear('Authorization-Token');
    setLoggedOut(true);
  }

  return (
    <Button variant="contained" color="primary" onClick={logout}>
      Logout
    </Button>
  );
}

export default Logout;
