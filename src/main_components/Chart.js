import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import '../css/App.css';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Chart = () => {
	//data states
	const [mappedPrice, setMappedPrice] = useState([]);
	const [mappedDate, setMappedDate] = useState([]);

	const [states, setStates] = useState({
		labels: mappedDate,
		datasets: mappedPrice,
	});

	const [symbol, setSymbol] = useState('');
	const [listSymbol, setListSymbol] = useState([]);
	const [mappedSymbols, setMappedSymbols] = useState([]);

	const [isDefined, setIsDefined] = useState(true);

	//links
	let linkDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;
	let linkOverview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;

	const getSymbol = (e) => {
		let symbolInput = e.target.value.toUpperCase();
		setSymbol(symbolInput);
	};

	//changing chart data
	useEffect(() => {
		setStates({ labels: mappedDate, datasets: mappedPrice });
		return () => {};
	}, [mappedPrice, mappedDate]);

	//random colors
	let value1 = Math.floor(Math.random() * 170);
	let value2 = Math.floor(Math.random() * 120);
	let value3 = Math.floor(Math.random() * 78);

	async function getData(e) {
		e.preventDefault();
		try {
			setIsDefined(true);
			const data = await fetch(linkDaily);
			const daily = await data.json();

			let fetchedDaily = daily['Time Series (Daily)'];
			let arrayFetchedDaily = Object.entries(fetchedDaily);

			//mapping prices and creating datasets for chart
			await setMappedPrice([
				...mappedPrice,
				{
					label: symbol,
					fill: false,
					lineTension: 0.5,
					backgroundColor: `rgba(${value1},${value2},${value3},1)`,
					borderColor: 'rgba(0,0,0,1)',
					borderWidth: 2,
					data: arrayFetchedDaily
						.map((item) => {
							return parseFloat(item[1]['4. close']);
						})
						.reverse(),
				},
			]);

			setMappedDate(
				arrayFetchedDaily
					.map((item) => {
						return item[0];
					})
					.reverse()
			);

			//fetching overview
			const overview = await fetch(linkOverview);
			const fetchedOverview = await overview.json();

			const over = {
				Name: fetchedOverview.Name,
				Exchange: fetchedOverview.Exchange,
				Currency: fetchedOverview.Currency,
				Symbol: symbol,
			};

			setListSymbol([...listSymbol, over]);
		} catch (err) {
			console.log(err);
			setIsDefined(false);
		}

		return {};
	}

	const deleteItem = (id) => {
		setListSymbol(
			listSymbol.filter((item) => {
				return item.Symbol !== id;
			})
		);
		setMappedPrice(mappedPrice.filter((item) => item.label !== id));
	};

	const makeList = () => {
		setMappedSymbols(
			listSymbol.map((item) => {
				return (
					<div className='listItem'>
						<span className='span_list_item'>{item.Symbol}</span>
						<span className='span_list_name'>{item.Name}</span>

						<FontAwesomeIcon
							className='delete_icon'
							onClick={() => deleteItem(item.Symbol)}
							icon={faTimesCircle}
							size='2x'
						/>
					</div>
				);
			})
		);
	};

	useEffect(() => {
		makeList();
		return () => {};
	}, [listSymbol]);

	return (
		<>
			<section className='Chart'>
				<article className='MainChart'>
					<section className='description'>
						<span className='span_top_description'>
							Currently on the chart:
						</span>
						{mappedSymbols}
					</section>
					<figure className='chart'>
						{
							<Line
								data={states}
								options={{
									title: {
										display: true,
										text: 'Stock price',
										fontSize: 40,
									},
									legend: {
										display: true,
										position: 'right',
									},
								}}
							/>
						}
					</figure>
					<section className='choose'>
						<form className='form_chart' onSubmit={getData}>
							<input
								type='text'
								className='symbol'
								value={symbol}
								onChange={getSymbol}
								placeholder='CC,BB,BK...'
							></input>
							{!isDefined && (
								<span className='span_danger'>This does not exist</span>
							)}
							<button type='submit' className='btn'>
								Add
							</button>
						</form>
					</section>
				</article>
			</section>
		</>
	);
};

export default Chart;
