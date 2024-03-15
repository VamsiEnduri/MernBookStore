import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";

const DeleteBooks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        navigate("/");
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <BackButton />
      <h2>Delete Book</h2>
      {loading ? "" : ""}
      <div className="bg-gray-400 w-[450px] rounded-lg border-2 mx-auto p-4">
        <h2>Are you surely want to dlete the log of this book .... ?</h2>
        <button onClick={handleDelete} className="bg-red-600 w-full my-4 py-4">
          delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
