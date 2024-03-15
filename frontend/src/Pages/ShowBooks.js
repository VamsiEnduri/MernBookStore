import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import axios from "axios";

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        // console.log(res.data);
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="ml-10 ">
        <BackButton destination="/" />
        <h1>Book List</h1>
        {loading ? (
          <h1>wait a second</h1>
        ) : (
          <div className="bg-sky-300 border w-fit p-4 rounded-lg">
            <div className="my-4">
              <span className="text-xl text-gray-800 mr-5">Id</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl  text-gray-800  mr-5">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl  text-gray-800  mr-5">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl  text-gray-800  mr-5">
                Published year
              </span>
              <span>{book.publishedYear}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowBooks;
