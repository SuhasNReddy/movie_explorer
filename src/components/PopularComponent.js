import { useState,useEffect } from "react";
import {  useLocation, useNavigate } from 'react-router-dom';


const PopularComponent = ({setImdbId}) => {
    // const { type } = useParams();
    const location=useLocation();
    const navigate=useNavigate();
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const movieIds = [
            "tt0848228",
            "tt7466810",
            "tt2112124",
            "tt26458038"
        ];

        const fetchMovieDetails = async () => {
            try {
                const promises = movieIds.map(async (id) => {
                    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=6159e3f2`);
                    const data = await response.json();
                    if (data.Response === 'True') {
                        return data;
                    } else {
                        throw new Error(data.Error || 'Error fetching data');
                    }
                });

                const moviesData = await Promise.all(promises);
                setPopularMovies(moviesData);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Error fetching data');
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, []);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    if (error) {
        return <div className='errormessage'>Error: {error}</div>;
    }

    return (
        <div className="popular" id="popular">
            <h2 className="mainHeading">Popular Movies</h2>

            <div className="popularContainer">
                {/* Map through the popularMovies state and render each movie */}
                {popularMovies.map((movie, index) => (
                    <div className="popularCard" key={index} onClick={()=>{
                        setImdbId(movie.imdbID);
                        if (location.pathname !== '/') {
                            navigate('/');
                          }

                    }

                    }>
                        <div className="popularImag">
                            <img src={movie.Poster} alt={movie.Title} />
                        </div>
                        <h3>{movie.Title}</h3>
                        <span>{movie.Released}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularComponent;
