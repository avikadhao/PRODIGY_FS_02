import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function NotFound() {
    return (
        <div className="container p-5 mb-5">
            <div className="row text-center">
                <div className="col">
                    <FontAwesomeIcon icon={faHome} size="6x" className="text-danger mb-4" />
                    <h1 className="mt-3 mb-3">404 Page Not Found</h1>
                    <p className='fs-5'>
                        The page you are looking for does not exist.
                    </p>
                    <Link to="/" className="btn btn-primary mt-3">
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Go to Home Page
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;