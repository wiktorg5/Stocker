import React from 'react';
import '../css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faInstagram,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	return (
		<div className='Footer'>
			<FontAwesomeIcon className='fb_icon' icon={faFacebook} size='5x' />
			<FontAwesomeIcon className='ig_icon' icon={faInstagram} size='5x' />
			<FontAwesomeIcon className='li_icon' icon={faLinkedin} size='5x' />
		</div>
	);
};

export default Footer;
