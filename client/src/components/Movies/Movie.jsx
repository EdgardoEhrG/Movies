import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoaded(false);
    const movie = axios
      .get(`http://localhost:4000/v1/movie/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        setError(err);
        setLoaded(false);
      });
    if (movie) {
      setMovie(movie);
      setLoaded(true);
    }
  }, [id]);

  if (movie.genres) {
    movie.genres = Object.values(movie.genres);
  } else {
    movie.genres = [];
  }

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
              <h2>
                Movie: {movie.title} ({movie.year})
              </h2>

              <div className="float-start">
                <small>Rating: {movie.mpaa_rating}</small>
              </div>
              <div className="float-end">
                {movie.genres.map((genre, index) => {
                  <span key={index} className="badge bg-secondary me-1">
                    {genre}
                  </span>;
                })}
              </div>
              <div className="clearfix"></div>

              <hr />

              <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>Title: </td>
                    <td>{movie.title}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{movie.description}</td>
                  </tr>
                  <tr>
                    <td>Run time: </td>
                    <td>{movie.runTime} minute(-s)</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Movie;
