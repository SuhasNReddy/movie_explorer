import React from 'react';

const SearchResult = ({ movies }) => {
  return (
    <div className="search_result">
      {movies.map((movie, index) => (
        <div className="card" key={index}>
          <img src={movie.image} alt={movie.title} />
          <div className="cont">
            <h3>{movie.title}</h3>
            <p>{movie.genre}, {movie.year}, <span>{movie.source}</span> {movie.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
