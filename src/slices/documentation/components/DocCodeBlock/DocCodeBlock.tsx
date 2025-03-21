
import React from 'react';
import { DocCodeBlockProps } from '../../types';

const DocCodeBlock: React.FC<DocCodeBlockProps> = ({ code, language = 'typescript', className = '' }) => {
  return (
    <div className={`rounded-lg bg-foreground/5 p-4 overflow-x-auto mb-4 ${className}`}>
      <pre className="text-sm font-mono text-foreground whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default DocCodeBlock;
