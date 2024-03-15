import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="m-4">
      <div className="flex justify-between items-center mx-7">
        <h1 className="text-3xl ">Book List</h1>
        <Link to={`/books/create`}>
          <MdOutlineAddBox className="text-4xl text-blue-700" />
        </Link>
      </div>
      {loading ? (
        <h2 className="text-xl">data loading wait a sec</h2>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <table className="w-full border-collapse border-spacing-2">
          <thead className="text-center">
            <tr className="">
              <th className="border border-slate-500 rounded-md p-3 uppercase">
                S.no
              </th>
              <th className="border border-slate-500 rounded-md  uppercase">
                title
              </th>
              <th className="border border-slate-500 rounded-md  uppercase">
                author
              </th>
              <th className="border border-slate-500 rounded-md  uppercase">
                publishedYear
              </th>
              <th className="border border-slate-500 rounded-md  uppercase">
                Manipulate
              </th>
            </tr>
          </thead>
          <tbody className="text-center ">
            {books.map((book, index) => (
              <tr key={index} className="py-3">
                <td className="border border-slate-500 rounded-md">
                  {index + 1}
                </td>
                <td className="border border-slate-500 rounded-md">
                  {book.title}
                </td>
                <td className="border border-slate-500 rounded-md">
                  {book.author}
                </td>
                <td className="border border-slate-500 rounded-md">
                  {book.publishedYear}
                </td>
                <td className="border border-slate-500 rounded-md">
                  <div className="flex justify-center items-cenyter gap-20 text-lg">
                    <Tooltip title="info" placement="left-start">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-green-700 cursor-pointer" />
                      </Link>
                    </Tooltip>
                    <Tooltip title="edit" placement="left-start">
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-yellow-700 cursor-pointer" />
                      </Link>
                    </Tooltip>
                    <Tooltip title="delete" placement="left-start">
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-red-700 cursor-pointer" />
                      </Link>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
