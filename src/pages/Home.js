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
    { degree: 'Computers and Informatics', institution: '', from: '', to: '' },
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
        <div className="featured-projects-container">
          <h2>Featured Projects</h2>
          <div className="featured-grid">
            {/* Deepwoken Trader */}
            <div className="featured-item">
              <div className="featured-content">
                <div className="featured-header">
                  <h3>Deepwoken Trader</h3>
                  <span className="featured-badge active">Active</span>
                </div>
                <p>A comprehensive trading platform for Deepwoken players. Features automated item valuation, secure middleman services, and real-time market data analysis.</p>
                <div className="project-meta">
                  <div className="project-language">
                    <div className="language-dot ts"></div>
                    <span>TypeScript</span>
                  </div>
                  <div className="project-language">
                    <div className="language-dot js"></div>
                    <span>JavaScript</span>
                  </div>
                  <span className="meta-tag"> High Traffic</span>
                </div>
              </div>
            </div>

            {/* Deepwoken Talents Helper */}
            <div className="featured-item">
              <div className="featured-content">
                <div className="featured-header">
                  <h3>Deepwoken Talents Helper</h3>
                  <span className="featured-badge utility">Utility</span>
                </div>
                <p>An interactive helper tool for optimizing character builds. Includes talent prerequisite checking, build planning, and synergy recommendations.</p>
                <div className="project-meta">
                  <div className="project-language">
                    <div className="language-dot ts"></div>
                    <span>TypeScript</span>
                  </div>
                  <div className="project-language">
                    <div className="language-dot html"></div>
                    <span>HTML</span>
                  </div>
                  <span className="meta-tag"> Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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

