import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CustomInput from "../components/CustomInput/CustomInput";

import axios from "axios";

const GraphQL = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const payload = `
        {
            list {
                id
                title
                runtime
                year
            }
        }
    `;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    setLoaded(false);
    const movies = axios
      .post("http://localhost:4000/v1/graphql/list", payload, { headers })
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

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchVal(value);
    performSearch();
  };

  const performSearch = () => {
    const payload = `
    {
        search(titleContains: "${searchVal}") {
            id
            title
            runtime
            year
            description
        }
    }`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    setLoaded(false);
    const movies = axios
      .post("http://localhost:4000/v1/graphql", payload, { headers })
      .then((res) => res.data)
      .catch((err) => {
        setError(err);
        setLoaded(false);
      });
    if (movies) {
      setMovies(movies);
      setLoaded(true);
    } else {
      setMovies([]);
      setLoaded(true);
    }
  };

  return (
    <>
      <CustomInput
        title="search"
        type="text"
        name="search"
        handleChange={handleChange}
      />

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
                    className="list-group-item list-group-item-action"
                    to={`/movies/${movie.id}`}
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
  );
};

export default GraphQL;
