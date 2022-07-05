import React from 'react';
import classes from './Logo.module.css';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <>
      <div className={classes['logo-wrapper']}>
        <h1>Meme-Generator</h1>
        <p className={classes['powered-text']}>powered by  <img className={classes['logo-img']} src={logo} alt='Full Stack Chris' width='60'/></p>
      </div>
    </>
  )
}

export default Logo