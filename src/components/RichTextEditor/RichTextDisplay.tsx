'use client';

import React from 'react';
import './RichTextEditor.css';

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

const RichTextDisplay: React.FC<RichTextDisplayProps> = ({ 
  content, 
  className = 'product-description-rich' 
}) => {
  // Remove empty paragraphs and clean content
  const cleanContent = content
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .trim();

  if (!cleanContent || cleanContent === '<p><br></p>') {
    return null;
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
};

export default RichTextDisplay;