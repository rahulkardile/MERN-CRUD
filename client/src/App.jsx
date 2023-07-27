import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Navbar";
import Create from "./assets/Create";
import Read from "./assets/Read";
import Update from "./assets/Update";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route path="/all" element={<Read />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;