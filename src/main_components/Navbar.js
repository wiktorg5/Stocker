import React from 'react';
import '../css/App.css';

const Navbar = () => {
	const move_logo = async (element) => {
		const logoImage = document.querySelector('.LogoImage');
		const logoText = document.querySelector('.LogoText');

		logoImage.style.position = 'absolute';
		logoImage.style.top = '100px';
		logoImage.style.left = '30px';
		logoImage.style.width = '20vw';
		logoImage.style.height = '10%';
		logoText.style.fontSize = '2.5rem';

		let dom = document.querySelector(element);

		let domdelete = 0;
		if (element === '#about') {
			domdelete = document.querySelector('#contact');
		} else {
			domdelete = document.querySelector('#about');
		}

		await window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		setTimeout(() => {
			domdelete.style.opacity = '0';
			dom.style.opacity = '0.7';
		}, 400);
	};

	const logo_back = async () => {
		const logoImage = document.querySelector('.LogoImage');
		const logoText = document.querySelector('.LogoText');

		const about = document.querySelector('#about');
		const contact = document.querySelector('#contact');

		about.style.opacity = '0';
		contact.style.opacity = '0';

		await window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		await setTimeout(() => {
			logoImage.style.width = '50vw';
			logoImage.style.height = '20%';
			logoText.style.fontSize = '7rem';
			logoImage.style.position = 'static';
		}, 200);
	};
	return (
		<nav className='Navbar'>
			<button className='btn' onClick={logo_back}>
				Home
			</button>
			<button className='btn' onClick={() => move_logo('#about')}>
				About
			</button>
			<button className='btn' onClick={() => move_logo('#contact')}>
				Contact
			</button>
		</nav>
	);
};

export default Navbar;
