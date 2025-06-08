import React, { useState } from 'react';
import SimpleContainer from '../Containers/SimpleContainer';

interface CopyLinkButtonProps {
  link: string | null;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ link }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button onClick={copyToClipboard}>
      <SimpleContainer style={{}}>
      {copied ? 'Copied!' : 'Copy'}
      </SimpleContainer>
    </button>
  );
};

export default CopyLinkButton;
