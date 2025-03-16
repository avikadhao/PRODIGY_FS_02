import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Employee Management
                </NavLink>
                
                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink 
                                to="/add" 
                                className="nav-link" 
                                activeClassName="active"
                            >
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                Add Employee
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;