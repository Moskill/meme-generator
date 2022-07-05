import React from 'react';
import classes from './Header.module.css';
import Logo from './Logo.jsx';

function Header() {
  return (
    <>
    <div className={classes['header-wrapper']}>
      <Logo/>
    </div>
    </>
  )
}

export default Header
