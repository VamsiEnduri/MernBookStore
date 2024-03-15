import React from "react";
// import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreateBooks from "./Pages/CreateBooks";
import EditBooks from "./Pages/EditBooks";
import ShowBooks from "./Pages/ShowBooks";
import DeleteBooks from "./Pages/DeleteBooks";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBooks />} />
        <Route path="/books/edit/:id" element={<EditBooks />} />
        <Route path="/books/details/:id" element={<ShowBooks />} />
        <Route path="/books/delete/:id" element={<DeleteBooks />} />
      </Routes>
    </div>
  );
};

export default App;
