import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import CustomInput from "../components/CustomInput/CustomInput";
import CustomTextarea from "../CustomTextarea/CustomTextarea";
import CustomSelect from "../CustomSelect/CustomSelect";

import "./EditMovie.scss";

import axios from "axios";

const options = [
  { value: "G", title: "G" },
  { value: "PG", title: "PG" },
  { value: "R", title: "R" },
  { value: "NC17", title: "NC17" },
];

const EditMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    rating: "",
    description: "",
  });
  const [isLoaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
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
    }
  }, [id]);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const payload = JSON.stringify(Object.fromEntries(data.entries()));

    await axios.post("http://localhost:4000/v1/admin/editMovie", payload);
  };

  return (
    <>
      {error && <div>{error}</div>}

      <h2>Add / Edit movie</h2>
      <hr />
      <form>
        <CustomInput
          name="title"
          title="Title"
          type="text"
          value={movie.title}
          handleChange={handleChange}
        />
        <CustomInput
          name="release_date"
          title="Release date"
          type="text"
          value={movie.release_date}
          handleChange={handleChange}
        />
        <CustomInput
          name="runtime"
          title="Runtime"
          type="text"
          value={movie.runtime}
          handleChange={handleChange}
        />
        <CustomSelect
          name="mpaa_rating"
          title="MPAA rating"
          value={movie.mpaa_rating}
          options={options}
          handleChange={handleChange}
        />
        <CustomInput
          name="rating"
          title="Rating"
          type="number"
          value={movie.rating}
          handleChange={handleChange}
        />
        <CustomTextarea
          name="description"
          title="Description"
          value={movie.description}
          handleChange={handleChange}
        />
        <hr />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </>
  );
};

export default EditMovie;
