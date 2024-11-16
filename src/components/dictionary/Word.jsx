import React, { useState } from 'react';
import './Word.css'; // Add a CSS file for component-specific styling if needed

const Word = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const fetchWordData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`);
      if (!response.ok) throw new Error('Word not found');
      const jsonData = await response.json();
      setData(jsonData[0]);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='dictionary-app'>
      <h1 className='title'>Dictionary App</h1>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search for a word...'
          onChange={handleInput}
          className='search-input'
        />
        <button onClick={fetchWordData} className='search-button'>
          Search
        </button>
      </div>

      {loading && <p className='loading'>Loading...</p>}

      {error && <p className='error'>{error}</p>}

      {data && (
        <div className='result-container'>
          <h2 className='word'>{data.word}</h2>
          <p className='part-of-speech'>
            <strong>Part Of Speech:</strong> {data.meanings[0]?.partOfSpeech}
          </p>
          <p className='definition'>
            <strong>Definition:</strong> {data.meanings[0]?.definitions[0]?.definition}
          </p>
          {data.meanings[0]?.synonyms?.length > 0 && (
            <p className='synonyms'>
              <strong>Synonyms:</strong> {data.meanings[0]?.synonyms.join(', ')}
            </p>
          )}
          {data.meanings[0]?.definitions[0]?.example && (
            <p className='example'>
              <strong>Example:</strong> {data.meanings[0]?.definitions[0]?.example}
            </p>
          )}
          {/* <a
            href={data.sourceUrls[0]}
            target='_blank'
            rel='noopener noreferrer'
            className='read-more'
          >
            Read More
          </a> */}
        </div>
      )}
    </div>
  );
};

export default Word;
