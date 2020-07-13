import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to="/" activeClassName={styles.activeTab} exact={true}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/create-promotion" activeClassName={styles.activeTab}>
            Create Promotion
          </NavLink>
        </li>
        <li>
          <NavLink to="/other" activeClassName={styles.activeTab}>
            Other
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
