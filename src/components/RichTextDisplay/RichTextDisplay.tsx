'use client';

import React from 'react';
import './RichTextDisplay.css';

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

const RichTextDisplay: React.FC<RichTextDisplayProps> = ({ content, className = '' }) => {
  if (!content) {
    return null;
  }

  // Handle both HTML content and plain text
  const isHtmlContent = content.includes('<') && content.includes('>');

  return (
    <div className={`rich-text-display ${className}`}>
      {isHtmlContent ? (
        <div 
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="plain-content">
          {content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? (
              <p key={index}>{paragraph}</p>
            ) : (
              <br key={index} />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default RichTextDisplay;