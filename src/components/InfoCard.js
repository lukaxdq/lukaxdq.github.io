import React from 'react';
import './InfoCard.css';

const InfoCard = () => {
  return (
    <div className="info-card">
      <div><span className="icon">🔗</span><strong>GitHub:</strong> <a href="https://github.com/lukaxdq" target="_blank" rel="noopener noreferrer">lukaxdq</a></div>
      <div><span className="icon">💬</span><strong>Discord:</strong> <a href="https://discord.com/users/998585779804708864" target="_blank" rel="noopener noreferrer">l1uka1</a></div>
      <div><span className="icon">📧</span><strong>Email:</strong> <a href="mailto:pajkanovicluka7@gmail.com?subject=Hello Luka">pajkanovicluka7@gmail.com</a></div>
    </div>
  );
};

export default InfoCard;

