import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="bg-gray-500 w-[100px] m-5 text-center rounded-lg text-white">
      <Link to={destination}>go back</Link>
    </div>
  );
};

export default BackButton;
