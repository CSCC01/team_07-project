import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-promotion">Create Promotion</Link>
        </li>
        <li>
          <Link to="/other">Other</Link>
        </li>
      </ul>
    </nav>
  );
}
