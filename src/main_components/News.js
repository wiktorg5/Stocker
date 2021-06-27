import React from 'react';
import Prismic from '@prismicio/client';
import { Date, Link, RichText } from 'prismic-reactjs';
import { useState, useEffect } from 'react/cjs/react.development';

const News = () => {
	const apiEndpoint = 'https://stocker.cdn.prismic.io/api/v2';
	const client = Prismic.client(apiEndpoint);

	const [objects, setObjects] = useState(null);

	const makeObjects = async (data) => {
		const objecty = data.map((item) => {
			const object = {
				title: item.data.title[0]['text'],
			};

			return object;
		});
		setObjects(objecty);
		return objects;
	};

	const fetchData = async () => {
		let data = 0;
		const response = await client.query(
			Prismic.Predicates.at('document.type', 'article')
		);
		if (response) {
			data = response.results;
			await makeObjects(data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='News'>
			<div className='Main_News'>{objects && objects[0]['title']}</div>
		</div>
	);
};

export default News;
