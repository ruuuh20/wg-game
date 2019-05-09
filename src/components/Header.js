import React from 'react';

const Header = (props) => {

    return (

  <div className='header-top'>
    <h3>Guess the Word</h3>
    <h3 className='right'>Difficulty level: {props.difficulty}</h3>
  </div>
    )
}

export default Header;
