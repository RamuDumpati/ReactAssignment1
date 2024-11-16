import React, { useState, useEffect } from 'react';
import './Random.css';

function RandomQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://dummyjson.com/quotes');
      const data = await response.json();

      // Select a random quote from the array
      const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-generator">
      <h1>Random Quote Generator</h1>
      <div className="quote-box">
        <p className="quote-text">"{quote}"</p>
        <p className="quote-author">- {author}</p>
        <button onClick={fetchQuote}>New Quote</button>
      </div>
    </div>
  );
}

export default RandomQuote;
