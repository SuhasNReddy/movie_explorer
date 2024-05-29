import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const API_KEY = '6159e3f2';
const API_URL = 'http://www.omdbapi.com/';

async function searchMovies(query) {
  try {
    const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === 'True') {
      console.log(data, "d");
      return data.Search;
    } else {
      // console.log(data.Error,"faff")
      throw new Error(data.Error); 
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    if((error.message === 'Movie not found!')){
      throw new Error(error.message);
    }
    throw new Error(error);
  }
}

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('avengers');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async (e) => {
    const searchTerm = e.target.value.trim(); 
    setSearchTerm(searchTerm);
    setLoading(true);
    setError('');
  
    try {
      if(searchTerm.length===0){
        //Do nothing
      }
      else if (searchTerm.length < 3) {
        throw new Error('Search term is too short. Please enter at least 3 characters.');
      } else {
        const results = await searchMovies(searchTerm);
        setSearchResults(results);
      }
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCardClick = (movie) => {
    props.setImdbId(movie.imdbID);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  console.log(searchResults);

  return (
    <nav>
      <div className="logo">
        <img src={require('../images/logo1.png')} alt="logo" />
        <ul>
          <li><Link to="/">Home Page</Link></li>
          {/* <li>Filter</li> */}
          <li><Link to="/popular">Popular</Link></li>
        </ul>
      </div>
      <div className="search_movie">
        <input
          type="text"
          id="search_input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="search_result">
          {loading && <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>}
          {error && <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>}
          
          {!loading && !error && searchResults.map((movie, index) => (
            <div className="card" key={index} onClick={() => handleCardClick(movie)}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className="cont">
                <h3>{movie.Title}</h3>
                <p>{movie.Type} , {movie.Year} , <span>IMDB</span>  {movie.imdbID}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
