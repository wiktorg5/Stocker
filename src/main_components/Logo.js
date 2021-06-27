import React from 'react';
import LogoImage from './logo_components/LogoImage';
import '../css/App.css';

const Logo = () => {
	return (
		<section className='Logo'>
			<LogoImage />
			<article className='about' id='about'>
				About
			</article>
			<article className='about' id='contact'>
				Contact
			</article>
		</section>
	);
};

export default Logo;
