import React from 'react';

export default function PageNotFound() {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4 text-danger">404</h1>
            <h2 className="mb-3">Page Not Found</h2>
            <p className="lead">
                Sorry, the page you are looking for does not exist.
            </p>
            <a href="/" className="btn btn-primary mt-3">
                Go Home
            </a>
        </div>
    );
}
