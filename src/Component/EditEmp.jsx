import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  faUser,
  faIdBadge,
  faBriefcase,
  faEnvelope,
  faGraduationCap,
  faHome,
  faDollarSign,
  faCalendarAlt,
  faChartLine,
  faSave,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import EmployeeContext from "../context/EmployeeContext";

const EditEmp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee, isEmailUnique } =
    useContext(EmployeeContext);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setFormData(employee);
    } else {
      toast.error("Employee not found");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [id, employees, navigate]);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        if (!isEmailUnique(value, id)) return "Email already exists";
        break;
      case "salary":
        if (!value) return "Salary is required";
        if (isNaN(value) || value <= 0) return "Must be a positive number";
        break;
      case "id":
        if (employees.some((emp) => emp.id === value && emp.id !== id))
          return "Employee ID must be unique";
        break;
      default:
        if (!value) return "This field is required";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Object.fromEntries(
      Object.entries(formData).map(([field, value]) => [
        field,
        validateField(field, value),
      ])
    );

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        await updateEmployee(id, {
          ...formData,
          salary: parseFloat(formData.salary),
        });
        toast.success("Employee updated successfully!");
        navigate("/");
      } catch (error) {
        if (error.message === "Email already exists!") {
          setErrors({ email: "This email is already registered" });
        }
      }
    }
  };

  if (!formData)
    return <div className="text-center mt-5">Loading employee data...</div>;

  const personalFields = [
    { label: "Full Name", icon: faUser, name: "name", type: "text" },
    { label: "Employee ID", icon: faIdBadge, name: "id", type: "text" },
    { label: "Email", icon: faEnvelope, name: "email", type: "email" },
    { label: "Address", icon: faHome, name: "address", type: "text" },
  ];

  const professionalFields = [
    {
      label: "Designation",
      icon: faBriefcase,
      name: "designation",
      type: "text",
    },
    {
      label: "Education",
      icon: faGraduationCap,
      name: "education",
      type: "text",
    },
    { label: "Salary", icon: faDollarSign, name: "salary", type: "number" },
    {
      label: "Joining Date",
      icon: faCalendarAlt,
      name: "joiningDate",
      type: "date",
    },
    {
      label: "Performance",
      icon: faChartLine,
      name: "performance",
      type: "select",
    },
  ];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Edit Employee
                </h2>
                <button onClick={() => navigate("/")} className="btn btn-light">
                  <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                  Cancel
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-12">
                  <h5 className="text-primary mb-3">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Personal Information
                  </h5>
                </div>

                {personalFields.map((field, idx) => (
                  <div key={idx} className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label text-muted small mb-1">
                        <FontAwesomeIcon icon={field.icon} className="me-2" />
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`form-control ${
                          errors[field.name] ? "is-invalid" : ""
                        }`}
                        disabled={field.name === "id"}
                        onBlur={(e) =>
                          setErrors((prev) => ({
                            ...prev,
                            [field.name]: validateField(
                              field.name,
                              e.target.value
                            ),
                          }))
                        }
                        required
                      />
                      {errors[field.name] && (
                        <div className="invalid-feedback">
                          {errors[field.name]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-12 mt-4">
                  <h5 className="text-primary mb-3">
                    <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                    Professional Information
                  </h5>
                </div>

                {professionalFields.map((field, idx) => (
                  <div key={idx} className="col-12 col-md-6">
                    <div className="form-group">
                      <label className="form-label text-muted small mb-1">
                        <FontAwesomeIcon icon={field.icon} className="me-2" />
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`form-control ${
                            errors[field.name] ? "is-invalid" : ""
                          }`}
                          onBlur={(e) =>
                            setErrors((prev) => ({
                              ...prev,
                              [field.name]: validateField(
                                field.name,
                                e.target.value
                              ),
                            }))
                          }
                        >
                          <option value="Normal">Normal</option>
                          <option value="Average">Average</option>
                          <option value="Excellent">Excellent</option>
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`form-control ${
                            errors[field.name] ? "is-invalid" : ""
                          }`}
                          min={field.type === "number" ? "0" : undefined}
                          onBlur={(e) =>
                            setErrors((prev) => ({
                              ...prev,
                              [field.name]: validateField(
                                field.name,
                                e.target.value
                              ),
                            }))
                          }
                          required
                        />
                      )}
                      {errors[field.name] && (
                        <div className="invalid-feedback">
                          {errors[field.name]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-12 text-center mt-5">
                  <button type="submit" className="btn btn-primary px-5 py-2">
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmp;
