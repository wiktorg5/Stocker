import React from 'react'
import '../css/App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <div className="Footer">
            <FontAwesomeIcon icon={faFacebook} size="5x" />
            <FontAwesomeIcon icon={faInstagram} size="5x" />
            <FontAwesomeIcon icon={faLinkedin} size="5x" />
        </div>
    )
}

export default Footer
