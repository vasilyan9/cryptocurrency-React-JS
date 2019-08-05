import React from 'react'
import {Link} from 'react-router-dom'
import './NotFond.css'

const NotFound = () => {
    return (
        <div className="NotFound">
            <h1 className="NotFound-title">Ooops!!! Page not found</h1>
            <Link to="/" className="NotFound-link">Go to Home Page</Link>
        </div>
    )
}
export default NotFound