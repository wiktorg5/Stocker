import React from 'react';
import Prismic from '@prismicio/client';
import { Date, Link, RichText } from 'prismic-reactjs';
import { useState, useEffect } from 'react/cjs/react.development';

const News = () => {
	const apiEndpoint = 'https://stocker.cdn.prismic.io/api/v2';
	const client = Prismic.client(apiEndpoint);

	const [data, setData] = useState([]);
	const [objects, setObjects] = useState(null);

	const makeObjects = () => {
		const objects = data.map((item) => {
			const object = {
				title: item.data.title[0]['text'],
			};

			return object;
		});
		setObjects(objects);
	};

	const fetchData = async () => {
		const response = await client.query(
			Prismic.Predicates.at('document.type', 'article')
		);
		if (response) {
			await setData(response.results);
			makeObjects();
		}
	};

	window.onload = fetchData;

	console.log(objects);
	return (
		<div className='News'>
			<div className='Main_News'>{console.log(objects)}</div>
		</div>
	);
};

export default News;
