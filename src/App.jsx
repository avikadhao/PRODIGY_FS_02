import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext"; // सही प्रोवाइडर इम्पोर्ट करें
import Navbar from "./Component/Navbar";
import AddEmp from "./Component/AddEmp";
import ListEmp from "./Component/ListEmp";
import EditEmp from "./Component/EditEmp";
import ViewEmp from "./Component/ViewEmp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./Component/NotFound";

const App = () => {
  return (
    <EmployeeProvider>
      <Router>
        <Navbar />
        <div className="container-fluid px-4 mt-4">
          <Routes>
            <Route path="/" element={<ListEmp />} />
            <Route path="/add" element={<AddEmp />} />
            <Route path="/edit/:id" element={<EditEmp />} />
            <Route path="/view/:id" element={<ViewEmp />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </EmployeeProvider>
  );
};

export default App;
