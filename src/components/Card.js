import React from 'react';
import './Card.css';

const Card = ({ username, tagline }) => {
  return (
    <div className="card">
      <div className="username">{username}</div>
      <div className="tagline">{tagline}</div>
    </div>
  );
};

export default Card;

