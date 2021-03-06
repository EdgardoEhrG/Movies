import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoaded(false);
    const genres = axios
      .get("http://localhost:4000/v1/genres")
      .then((res) => res.data)
      .catch((err) => {
        setError(err);
        setLoaded(false);
      });
    if (genres) {
      setGenres(genres);
      setLoaded(true);
    }
  }, []);

  return (
    <div>
      <h2>Genres</h2>

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
                  <h2>Genres</h2>

                  <div className="list-group">
                    {genres.map((genre) => (
                      <Link
                        key={genre.id}
                        className="list-group-item list-group-item-action"
                        to={{
                          pathname: `/genre/${genre.id}`,
                          genreName: genre.genre_name,
                        }}
                      >
                        {genre.genre_name}
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

export default Genres;
