import React, { useState } from 'react';
import './ShowcaseCard.css';

const ShowcaseCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="showcase-card" onClick={openModal}>
        {item.type === 'image' ? (
          <img src={item.src} alt={item.title || 'Showcase image'} className="showcase-media" />
        ) : (
          <video src={item.src} className="showcase-media" muted />
        )}
        {item.title && (
          <div className="showcase-caption">{item.title}</div>
        )}
      </div>

      {isModalOpen && (
        <div className="showcase-modal" onClick={closeModal}>
          <div className="showcase-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="showcase-modal-close" onClick={closeModal}>×</button>
            <div className="showcase-modal-body">
              {item.type === 'image' ? (
                <img src={item.src} alt={item.title || 'Showcase image'} />
              ) : (
                <video src={item.src} controls autoPlay />
              )}
            </div>
            {item.title && (
              <div className="showcase-modal-caption">{item.title}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShowcaseCard;

