import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';
import '../css/App.css';
import { Line } from 'react-chartjs-2';

const Chart = () => {
	//overview and symbol states
	const [symbol, setSymbol] = useState('');
	const [overview, setOverview] = useState({
		Name: '',
		Exchange: '',
		Currency: '',
	});

	//links
	let linkDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;
	let linkOverview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;

	//chart data states
	const [mappedPrice, setMappedPrice] = useState([]);
	const [mappedDate, setMappedDate] = useState([]);

	//chart state
	const [states, setStates] = useState({
		labels: mappedDate,
		datasets: mappedPrice,
	});

	//if form submitted state
	const [submitted, setSubmitted] = useState(false);

	//getting symbol from input
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

	//taking data from json and making chart
	async function getData(e) {
		e.preventDefault();
		try {
			//getting daily data
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

			//mapping time
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

			const { Name, Exchange, Currency } = fetchedOverview;
			console.log(Name, Exchange, Currency);
			setOverview({ Name, Exchange, Currency });

			setSubmitted(true);
		} catch (err) {
			console.log(err);
		}

		return {};
	}

	return (
		<>
			<div className='Chart'>
				<div className='MainChart'>
					<div className='description'></div>

					<div className='chart'>
						{submitted && (
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
						)}
					</div>
					<div className='choose'>
						<form className='form_chart' onSubmit={getData}>
							<input
								type='text'
								className='symbol'
								value={symbol}
								onChange={getSymbol}
								placeholder='Symbol..'
							></input>
							<button type='submit' className='btn'>
								Search
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className='Comparison'>
				<div className='MainComparison'></div>
			</div>
		</>
	);
};

export default Chart;
