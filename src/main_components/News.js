import React from 'react';
import Prismic from '@prismicio/client';
import { Date, Link, RichText } from 'prismic-reactjs';
import { useState, useEffect } from 'react/cjs/react.development';

const News = () => {
	const apiEndpoint = 'https://stocker.cdn.prismic.io/api/v2';
	const client = Prismic.client(apiEndpoint);

	const [objects, setObjects] = useState(null);
	const [display, setDisplay] = useState(null);

	const makeObjects = async (data) => {
		const objecty = data.map((item) => {
			const object = {
				title: item.data.title[0]['text'],
				text: item.data.text[0]['text'],
			};

			return object;
		});
		setObjects(objecty);
		return objects;
	};

	const displayData = () => {
		setDisplay(
			objects.map((item) => {
				return (
					<article className='news_article'>
						<header className='news_article_header'>{item.title}</header>
						<section className='news_article_text'>{item.text}</section>
					</article>
				);
			})
		);
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
		objects && displayData();
	}, [objects]);

	return (
		<div className='News'>
			<span className='articles_header'>News</span>
			{display}
		</div>
	);
};

export default News;
