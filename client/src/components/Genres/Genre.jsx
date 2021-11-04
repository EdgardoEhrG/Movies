import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";

import axios from "axios";

const Genre = () => {
  const { id } = useParams();
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    setLoaded(false);
    const movies = axios
      .get(`http://localhost:4000/v1/movies/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        setError(err);
        setLoaded(false);
      });
    if (movies) {
      setMovies(movies);
      setGenreName(location.genreName);
      setLoaded(true);
    }
  }, [id, location.genreName]);

  return (
    <div>
      <h2>Genre: {genreName}</h2>

      {
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

                  <div className="list-group">
                    {movies.map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/movies/${movie.id}`}
                        className="list-group-item list-group-item-action"
                      >
                        {movie.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      }
    </div>
  );
};

export default Genre;
