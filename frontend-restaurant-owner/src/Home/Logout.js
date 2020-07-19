import React from 'react';
import Button from '@material-ui/core/Button';

import axios from 'axios';

function Logout(props) {
  function logout() {
    localStorage.clear('Authorization-Token');
    delete axios.defaults.headers.common['Authorization'];
  }

  return (
    <Button data-testid="logout" variant="contained" color="primary" onClick={logout} href="/login">
      Logout
    </Button>
  );
}

export default Logout;
