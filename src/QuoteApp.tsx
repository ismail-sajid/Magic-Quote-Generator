import React, { useState, useEffect } from 'react';
import { Quote } from './components/Quotes';
import { UserQuotes } from './components/UserQuotes';
import './App.css';
import { Navbar } from 'components/Navbar';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from 'UserContext';
import { fetchQuotes } from './services/quoteService';

interface QuoteType {
  text: string;
  author: string | null;
}

export const QuoteApp: React.FC = ({}) => {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [magicQuote, setMagicQuote] = useState<string>('');
  const { user } = useUser();

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const data = await fetchQuotes();
        setQuotes(data);
        setMagicQuote(data[Math.floor(Math.random() * data.length)].text);
      } catch (error) {
        console.error('Error fetching quotes', error);
      }
    };

    getQuotes();
  }, []);

  const generateMagicQuote = () => {
    setMagicQuote(quotes[Math.floor(Math.random() * quotes.length)].text);
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <h1 className="heading-text">Magic Quote Generator</h1>
        <div className="magic-quote-card">
          <h2 className="magic-text">Magic Quote</h2>{' '}
          <Quote magicQuote={magicQuote} generateMagicQuote={generateMagicQuote} />
        </div>
        {user ? (
          <>
            <UserQuotes username={user} />
          </>
        ) : (
          <p>
            Please{' '}
            <Link to="/login">
              <b>sign in</b>
            </Link>{' '}
            to see your quotes.
          </p>
        )}
      </div>
    </>
  );
};
