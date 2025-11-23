import React from 'react';
import './TechStack.css';

const TechStack = () => {
  const techs = [
    'Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Lua', 
    'PowerShell', 'AutoHotkey', 'React', 'Vue.js', 'Next.js', 
    'Node.js', 'Tailwind CSS', 'HTML5', 'MySQL', 'MongoDB'
  ];

  return (
    <div className="tech-stack">
      <strong>Tech Stack</strong>
      <div className="tech-list">
        {techs.map((tech, index) => (
          <span key={index} className="tech-badge">{tech}</span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;

