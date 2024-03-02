import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Create from "./components/create/Create";
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App