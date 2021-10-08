import React, { useState } from "react";
import { useParams } from "react-router";

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});

  return (
    <>
      <h2>Movie: {movie.title}</h2>
      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td>Title: </td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td>Run time: </td>
            <td>{movie.runTime} minute(-s)</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Movie;
