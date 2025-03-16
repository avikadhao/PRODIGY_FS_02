import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import EmployeeContext from "../context/EmployeeContext";

const ListEmp = () => {
  const { employees, deleteEmployee } = useContext(EmployeeContext);

  const getPerformanceBadge = (performance) => {
    switch (performance) {
      case "Excellent":
        return "bg-success";
      case "Average":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
          <h2 className="mb-0">Employee List</h2>
          <NavLink to="/add" className="btn btn-light">
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Add New Employee
          </NavLink>
        </div>

        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Sr.N</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm bg-primary text-white rounded-circle me-3">
                          {emp.name.charAt(0)}
                        </div>
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td>{emp.designation}</td>
                    <td>{emp.email}</td>
                    <td>
                      <span
                        className={`badge ${getPerformanceBadge(
                          emp.performance
                        )}`}
                      >
                        {emp.performance}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <NavLink
                          to={`/view/${emp.id}`}
                          className="btn btn-sm btn-outline-info"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </NavLink>
                        <NavLink
                          to={`/edit/${emp.id}`}
                          className="btn btn-sm btn-outline-warning"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </NavLink>
                        <button
                          onClick={() => deleteEmployee(emp.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {employees.length === 0 && (
              <div className="text-center py-5 text-muted">
                <h4>No employees found</h4>
                <p>Click the "Add New Employee" button to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEmp;
