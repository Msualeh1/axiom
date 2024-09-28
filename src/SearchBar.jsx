import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (!query) {
      setError('Please enter a search term');
      return;
    }

    // Redirect to ProductPage with query parameter
    navigate(`/products?query=${query}`);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          style={styles.input}
          aria-label="Search for products"
        />
        <button type="submit" style={styles.button} aria-label="Search button">
          Search
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding is included in width
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    borderRadius:'0.5rem',
    border:'2px solid #6F8FAF',
    maxWidth: '300px', // Max width on larger screens
    marginRight: '10px',
    boxSizing: 'border-box',
    flex: '1', // Make it flexible
  },
  button: {
    padding: '10px 15px',
    flexShrink: '0', // Prevents shrinking on small screens
    cursor: 'pointer',
    backgroundColor:'#343434',
    color:'white',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  // Media query for smaller screens
  '@media (max-width: 600px)': {
    form: {
      flexDirection: 'column', // Stack input and button on top of each other
    },
    input: {
      marginRight: '0', // Remove margin on small screens
      marginBottom: '10px', // Add margin between input and button
    },
  },
};

export default SearchBar;
