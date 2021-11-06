import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import CustomInput from "../components/CustomInput/CustomInput";
import CustomTextarea from "../CustomTextarea/CustomTextarea";
import CustomSelect from "../CustomSelect/CustomSelect";

import "./EditMovie.scss";
import "react-confirm-alert/src/react-confirm-alert.css";

import { toast } from "react-toastify";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

const options = [
  { value: "G", title: "G" },
  { value: "PG", title: "PG" },
  { value: "R", title: "R" },
  { value: "NC17", title: "NC17" },
];

const EditMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({
    id: "",
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    rating: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (id) {
      const movie = axios
        .get(`http://localhost:4000/v1/movie/${id}`)
        .then((res) => res.data)
        .catch((err) => {
          toast.error("Smt went wrong...");
          setError(err);
        });
      if (movie) {
        toast.success("The movie was updated");
        setMovie(movie);
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

    if (movie.title === "") {
      setErrors((arr) => [...arr, "title"]);
    }

    const data = new FormData(e.target);
    const payload = JSON.stringify(Object.fromEntries(data.entries()));

    const res = await axios.post(
      "http://localhost:4000/v1/admin/editMovie",
      payload
    );

    if (res.status() === 200) {
      toast.success("A movie was added");
    } else {
      toast.error("Smt went wrong...");
    }
  };

  const handleDelete = (e) => {
    confirmAlert({
      title: "Delete the movie?",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`http://localhost:4000/v1/admin/deleteMovie${id}`)
              .then((res) => {
                if (res.status === 200) {
                  toast.success("Movie was deleted");
                }
              })
              .catch((err) => {
                toast.error(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            //
          },
        },
      ],
    });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return (
    <>
      {error && <div>{error}</div>}

      <h2>Add / Edit movie</h2>
      <hr />
      <form>
        <CustomInput
          className={hasError("title") ? "is-invalid" : ""}
          name="title"
          title="Title"
          type="text"
          value={movie.title}
          handleChange={handleChange}
          errDiv={hasError("title") ? "text-danger" : "d-none"}
          errMsg={"Please enter a title"}
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
        <Link to="/admin" className="btn btn-warning ms-1">
          Cancel
        </Link>
        {movie.id > 0 && (
          <button className="btn btn-danger ms-1" onClick={handleDelete}>
            Delete
          </button>
        )}
      </form>
    </>
  );
};

export default EditMovie;
