import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import AddStudent from "./Component/AddStudent.jsx";
import AllStudent from "./Component/AllStudent.jsx";
import OneStudent from './Component/One_Student.jsx';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>      
      <Route path="addstudent" element={<AddStudent />} />
      <Route path="/" element={<AllStudent />} />
      <Route path="onestudent/:sid" element={<OneStudent />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
