import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoaded(false);
    const movies = axios
      .get("http://localhost:4000/v1/movies")
      .then((res) => res.data)
      .catch((err) => {
        setError(err);
        setLoaded(false);
      });
    if (movies) {
      setMovies(movies);
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <h2>Choose a movie</h2>

              <ul>
                {movies.map((movie) => (
                  <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Movies;
