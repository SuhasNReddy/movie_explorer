import React, { useState, useEffect } from 'react';

const ContentComponent = ({ imdbID }) => {
  
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6159e3f2`);
        const data = await response.json();
        if (data.Response === 'True') {
          setContent(data);
          setLoading(false);
        } else {
          setError('No content found.');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching content. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [imdbID]);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='errormessage'>{error}</div>;
  }

  return (
    <div className="content">
      <img src={content.Poster} alt={content.Title} />
      <div>
        <h2 id="title">{content.Title}</h2>
        <p>{content.Plot}</p>
        <div>Directed By : {content.Director}</div>
        <div>Stars : {content.Actors.split(', ').join(' | ')}</div>
        <h3 style={{color:'rgb(142, 230, 48)'}} >{content.Type}</h3>
        <div className="details">
          <h5 id="gen">{content.Genre.split(', ').join(' | ')}</h5>
          <h4>{content.Released}</h4>
          <h3 id="rate"><span>IMDB</span> ★{content.imdbRating}</h3>
        </div>
      </div>
    </div>
  );
}

export default ContentComponent;
