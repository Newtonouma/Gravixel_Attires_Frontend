'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: number;
}

// Dynamically import ReactQuill with better error handling
const ReactQuill = dynamic(
  async () => {
    try {
      const { default: RQ } = await import('react-quill');
      return RQ;
    } catch (error) {
      console.error('Failed to load ReactQuill:', error);
      // Return a fallback component
      return function FallbackEditor({ value, onChange, placeholder }: any) {
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg min-h-[200px] resize-vertical"
            style={{ fontFamily: 'inherit' }}
          />
        );
      };
    }
  },
  {
    ssr: false,
    loading: () => <div className="w-full p-3 border border-gray-300 rounded-lg min-h-[200px] flex items-center justify-center">Loading editor...</div>,
  }
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter description...",
  readOnly = false,
  height = 200,
}) => {
  const [mounted, setMounted] = useState(false);
  const [editorHeight, setEditorHeight] = useState(height);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Configure toolbar modules
  const modules = useMemo(() => ({
    toolbar: readOnly ? false : [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  }), [readOnly]);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'link', 'align'
  ];

  if (!mounted) {
    return (
      <div className="w-full p-3 border border-gray-300 rounded-lg min-h-[200px] flex items-center justify-center">
        Initializing editor...
      </div>
    );
  }

  return (
    <div 
      className={`rich-text-editor ${readOnly ? 'read-only' : ''}`} 
      style={{ 
        minHeight: `${editorHeight}px`,
        marginBottom: readOnly ? '0' : '2rem'
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        modules={modules}
        formats={formats}
        style={{ 
          height: readOnly ? 'auto' : `${editorHeight}px`,
          minHeight: readOnly ? 'auto' : '150px'
        }}
      />
    </div>
  );
};

export default RichTextEditor;