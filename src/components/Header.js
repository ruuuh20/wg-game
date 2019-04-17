import React from 'react';

const Header = (props) => {
  if (props.start == true) {
    return (

  <div className='header-top'>
    <h2>Guess the Word</h2>
    <h2 className='right'>Difficulty level: {props.difficulty}</h2>
  </div>
) } else {
  return (
    <div className="header">
        <div className='left'>Guess the Word</div>
        <h2 className='right'>Difficulty level: {props.difficulty}</h2>
    </div>
  )

}
};

export default Header;
