import React, { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${_id}`)
      .then((res) => {
        console.log(res.data);
        setAuthor(res.data.author);
        setPublishedYear(res.data.publishedYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [_id]);

  function handleEditBook() {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${_id}`, data)
      .then((res) => {
        navigate("/");
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <>
      <div>
        <BackButton />
        <h1>Edit Book</h1>
        {loading ? (
          <>Edit book ...</>
        ) : (
          <div className="bg-sky-700 w-[500px] mx-auto flex flex-col justify-center items-center rounded-lg shadow-lg shadow-gray-700 gap-y-3 my-2 py-2">
            <div className="flex flex-col justify-center items-center">
              <label className="text-lg w-full">Title</label>
              <input
                className="w-full p-2 rounded-md opacity-75"
                placeholder="Enter Title Here"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="text-lg  w-full">Author</label>
              <input
                className="p-2 rounded-md opacity-75 w-full"
                placeholder="Enter Author Name"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="text-lg  w-full">Publish Year</label>
              <input
                className="p-2 rounded-md opacity-75 w-full"
                placeholder="Enter PublishedYear"
                type="number"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
              />
            </div>
            <button
              onClick={handleEditBook}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditBooks;
