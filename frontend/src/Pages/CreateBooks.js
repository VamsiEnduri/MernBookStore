import React, { useState } from "react";
import BackButton from "../Components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSaveBook() {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then((res) => {
        navigate("/");
        setLoading(false);
        setAuthor("");
        setPublishedYear("");
        setTitle("");
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
        <h1>Create Book</h1>
        {loading ? (
          <>create book ...</>
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
              onClick={handleSaveBook}
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

export default CreateBooks;
