import React from 'react';
import Button from '@material-ui/core/Button';

import axios from 'axios';

function Logout(props) {
  function logout() {
    localStorage.clear('Authorization-Token');
    delete axios.defaults.headers.common['Authorization'];
    window.location.assign('/login');
  }

  return (
    <Button
      data-testid="logout"
      variant="outlined"
      color="#000"
      onClick={logout}
      style={{ border: '#000 2px solid', position: 'relative', top: -7 }}
    >
      Logout
    </Button>
  );
}

export default Logout;
