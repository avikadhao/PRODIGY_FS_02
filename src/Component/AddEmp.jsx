import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import EmployeeContext from "../context/EmployeeContext";

const AddEmp = () => {
  const { employees, addEmployee  } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const initialFormState = {
    name: "",
    id: "",
    designation: "",
    email: "",
    education: "",
    address: "",
    salary: "",
    joiningDate: "",
    performance: "Normal",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        break;
      case "salary":
        if (!value) return "Salary is required";
        if (isNaN(value) || value <= 0) return "Must be a positive number";
        break;
      case "id":
        if (employees.some((emp) => emp.id === value))
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
        await addEmployee({
          ...formData,
          salary: parseFloat(formData.salary),
        });
        toast.success("Employee added successfully!");
        setFormData(initialFormState);
        navigate("/");
      } catch (error) {
        toast.error("Error adding employee: " + error.message);
      }
    }
  };

  const formFields = [
    { label: "Full Name", icon: faUser, name: "name", type: "text" },
    { label: "Employee ID", icon: faIdBadge, name: "id", type: "text" },
    {
      label: "Designation",
      icon: faBriefcase,
      name: "designation",
      type: "text",
    },
    { label: "Email", icon: faEnvelope, name: "email", type: "email" },
    {
      label: "Education",
      icon: faGraduationCap,
      name: "education",
      type: "text",
    },
    { label: "Address", icon: faHome, name: "address", type: "text" },
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
              <h2 className="mb-0 text-center">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Add New Employee
              </h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} className="row g-4">
                {formFields.map((field, idx) => (
                  <div key={idx} className="col-12 col-md-6">
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
                        placeholder={`Enter ${field.label.toLowerCase()}`}
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
                ))}
                <div className="col-12 text-center mt-4">
                  <button type="submit" className="btn btn-primary px-5 py-2">
                    Add Employee
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

export default AddEmp;
