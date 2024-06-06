import { useCallback, useState } from 'react';
import React from 'react';
import './styles/Quotes.css';
import { FaRegCopy } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface QuoteProps {
  magicQuote: string;
  generateMagicQuote: () => void;
}

export const Quote: React.FC<QuoteProps> = ({ magicQuote, generateMagicQuote }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(magicQuote)
      .then(() => {
        setIsCopied(true);

        toast.success('Quote copied to clipboard!');
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch(() => {
        setIsCopied(false);
        toast.error('Failed to copy quote.');
      });
  }, [magicQuote]);
  return (
    <>
      <div className="quote-container">
        <p className="quote-text">{magicQuote}</p>
        {isCopied ? <FaCheckCircle /> : <FaRegCopy onClick={copyToClipboard} className="copy-icon" />}
      </div>
      <button onClick={generateMagicQuote} className="generate-button">
        Generate New Quote
      </button>
    </>
  );
};
