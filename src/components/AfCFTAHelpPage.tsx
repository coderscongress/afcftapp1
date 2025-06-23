// src/components/AfCFTAHelpPage.tsx
import React, { useEffect, useState } from 'react';
import './AfCFTAHelpPage.css';

interface FAQ {
  question: string;
  answer: string;
}

const AfCFTAHelpPage: React.FC = () => {
  const [faq, setFaq] = useState<FAQ[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/help')
      .then(res => res.json())
      .then(data => setFaq(data.faq))
      .catch(err => console.error('Failed to load FAQ:', err));
  }, []);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="help-page">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faq.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleIndex(index)}
              aria-expanded={index === activeIndex}
            >
              {item.question}
              <span className={`arrow ${index === activeIndex ? 'open' : ''}`}>▾</span>
            </button>
            {index === activeIndex && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AfCFTAHelpPage;
