import React, { useState } from 'react';
import axios from 'axios';
import './CountrySearch.css'

function CountrySearch() {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
            setCountryData(response.data[0]);
            setError(''); // Clear any previous errors
        } catch (err) {
            setCountryData(null);
            setError('Country not found. Please try again.');
        }
    };

    return (
        <div className='container'>
            <h1 className='header'>Country Search</h1>
            <div className='searchContainer'>
                <input
                    className='input'
                    type="text"
                    placeholder="Enter country name"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                />
                <button className='button' onClick={handleSearch}>
                    Search
                </button>
            </div>
            {error && <p className='error'>{error}</p>}
            {countryData && (
                <div className='resultContainer'>
                    <h2>{countryData.name.common}</h2>
                    <img src={countryData.flags.svg} alt={`${countryData.name.common} flag`} className='flag' />
                    <p><strong>Capital:</strong> {countryData.capital ? countryData.capital[0] : 'N/A'}</p>
                    <p><strong>Region:</strong> {countryData.region}</p>
                    <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
                    <p><strong>Languages:</strong> {Object.values(countryData.languages || {}).join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default CountrySearch;
