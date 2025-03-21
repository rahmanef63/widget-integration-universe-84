
import React from 'react';

interface DocCodeBlockProps {
  code: string;
}

const DocCodeBlock: React.FC<DocCodeBlockProps> = ({ code }) => {
  return (
    <div className="rounded-lg bg-foreground/5 p-4 overflow-x-auto mb-4">
      <pre className="text-sm font-mono text-foreground whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default DocCodeBlock;
