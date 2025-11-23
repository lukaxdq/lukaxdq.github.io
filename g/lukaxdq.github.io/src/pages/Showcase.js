import React, { useEffect, useState } from 'react';
import ShowcaseCard from '../components/ShowcaseCard';
import './Showcase.css';

const Showcase = () => {
  const [showcaseItems, setShowcaseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShowcase = async () => {
      try {
        const response = await fetch(`/showcase/manifest.json?cacheBust=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`Unexpected response: ${response.status}`);
        }
        const manifest = await response.json();
        setShowcaseItems(manifest.items || []);
        setLoading(false);
      } catch (err) {
        console.error('Error loading showcase:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadShowcase();
  }, []);

  if (loading) {
    return (
      <div className="showcase">
        <div className="showcase-container">
          <h2>Showcase</h2>
          <div className="loading">Loading showcase items...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="showcase">
        <div className="showcase-container">
          <h2>Showcase</h2>
          <div className="error">Failed to load showcase: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="showcase">
      <div className="showcase-container">
        <h2>Showcase</h2>
        {showcaseItems.length === 0 ? (
          <div className="empty-message">No showcase items available. Add items to showcase/media folder.</div>
        ) : (
          <div className="showcase-grid">
            {showcaseItems.map((item, index) => (
              <ShowcaseCard key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Showcase;

