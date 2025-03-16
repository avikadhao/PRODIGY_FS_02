import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faIdBadge,
  faBriefcase,
  faEnvelope,
  faGraduationCap,
  faHome,
  faDollarSign,
  faCalendarAlt,
  faChartLine,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import EmployeeContext from "../context/EmployeeContext";
import { toast } from "react-toastify";

const ViewEmp = () => {
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    toast.error("Employee not found");
    return (
      <div className="container my-5 text-center">
        <h2 className="mb-3">Employee Not Found</h2>
        <Link to="/" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Employee List
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSalary = (salary) => {
    return `$${parseFloat(salary).toLocaleString()}`;
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white py-4">
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/" className="btn btn-light">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Back to List
                </Link>
                <h2 className="mb-0 text-center">
                  <FontAwesomeIcon icon={faUserTie} className="me-2" />
                  Employee Profile
                </h2>
                <div style={{ width: "116px" }}></div> {}
              </div>
            </div>

            <div className="card-body p-4">
              <div className="row g-4">
                {}
                <div className="col-12 text-center mb-4">
                  <div className="avatar-profile bg-primary text-white rounded-circle mb-3">
                    {employee.name.charAt(0)}
                  </div>
                  <h3 className="mb-1">{employee.name}</h3>
                  <p className="text-muted mb-0">{employee.designation}</p>
                  <div className="mt-2">
                    <span
                      className={`badge ${getPerformanceBadge(
                        employee.performance
                      )}`}
                    >
                      {employee.performance} Performer
                    </span>
                  </div>
                </div>

                {}
                <div className="col-12 col-md-6">
                  <div className="detail-card">
                    <h5 className="section-title mb-4">
                      <FontAwesomeIcon icon={faIdBadge} className="me-2" />
                      Basic Information
                    </h5>
                    <DetailRow
                      icon={faIdBadge}
                      label="Employee ID"
                      value={employee.id}
                    />
                    <DetailRow
                      icon={faBriefcase}
                      label="Designation"
                      value={employee.designation}
                    />
                    <DetailRow
                      icon={faGraduationCap}
                      label="Education"
                      value={employee.education}
                    />
                    <DetailRow
                      icon={faCalendarAlt}
                      label="Joining Date"
                      value={formatDate(employee.joiningDate)}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="detail-card">
                    <h5 className="section-title mb-4">
                      <FontAwesomeIcon icon={faChartLine} className="me-2" />
                      Professional Details
                    </h5>
                    <DetailRow
                      icon={faDollarSign}
                      label="Salary"
                      value={formatSalary(employee.salary)}
                    />
                    <DetailRow
                      icon={faChartLine}
                      label="Performance"
                      value={
                        <span
                          className={`badge ${getPerformanceBadge(
                            employee.performance
                          )}`}
                        >
                          {employee.performance}
                        </span>
                      }
                    />
                  </div>

                  <div className="detail-card mt-4">
                    <h5 className="section-title mb-4">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Contact Information
                    </h5>
                    <DetailRow
                      icon={faEnvelope}
                      label="Email"
                      value={employee.email}
                    />
                    <DetailRow
                      icon={faHome}
                      label="Address"
                      value={employee.address}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="detail-row mb-3">
    <div className="d-flex align-items-center">
      <FontAwesomeIcon
        icon={icon}
        className="me-3 text-primary"
        style={{ width: "20px" }}
      />
      <div>
        <small className="text-muted">{label}</small>
        <div className="fw-medium">{value || "Not provided"}</div>
      </div>
    </div>
  </div>
);

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

export default ViewEmp;
