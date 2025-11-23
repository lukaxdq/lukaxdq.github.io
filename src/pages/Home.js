import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import InfoCard from '../components/InfoCard';
import TechStack from '../components/TechStack';
import ProjectCard from '../components/ProjectCard';
import EducationCard from '../components/EducationCard';
import './Home.css';

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/lukaxdq/repos?sort=updated&per_page=10');
        const data = await response.json();
        // Filter out forks and only show original repos
        const originalRepos = data.filter(repo => !repo.fork).slice(0, 10);
        setRepos(originalRepos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const educations = [
    { degree: 'Cybersecurity Enthusiast', institution: 'Aspiring Penetration Tester', from: '', to: '' },
  ];

  return (
    <div className="home">
      <div className="left-section">
        <Card username="lukadev" tagline="Cybersecurity enthusiast and aspiring penetration tester" />
        <InfoCard />
        <TechStack />
        <EducationCard educations={educations} />
      </div>
      <div className="right-section">
        <div className="projects-container">
          <h2>Github Projects</h2>
          <div className="projects-grid">
            {loading ? (
              <div className="loading">Loading repositories...</div>
            ) : repos.length === 0 ? (
              <div className="loading">No repositories found.</div>
            ) : (
              repos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo.full_name} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

