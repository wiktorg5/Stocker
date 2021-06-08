import React from 'react';
import { useState } from 'react/cjs/react.development';
import '../css/App.css'

const Chart = () => {

    const [symbol, setSymbol] = useState('');
    const [overview, setOverview] = useState({
        Name:'',
        Exchange:'',
        Currency:''
    })
    let linkDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;
    let linkOverview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`

    const getSymbol = (e) =>{
        let symbolInput = e.target.value.toUpperCase();
        setSymbol(symbolInput);
        console.log(symbol);
    }

    async function getData (e){
        e.preventDefault();
        const data = await fetch(linkDaily);
        const fetchedDaily = await data.json();

        console.log(fetchedDaily);
    
        const overview = await fetch(linkOverview);
        const fetchedOverview = await overview.json();

        console.log(fetchedOverview);

        const {Name, Exchange, Currency} = fetchedOverview;
        console.log(Name, Exchange, Currency);
        setOverview({Name,Exchange,Currency})
        
        return {fetchedDaily, fetchedOverview};
    }
    

    return (
        <div className="Chart">
            <div className="MainChart">
            <div className="choose">
                <form onSubmit={getData}>
                    <input type="text" className="symbol" value={symbol} onChange={getSymbol}></input>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="chart"></div>
            <div className="description">
                {overview.Name}
                {overview.Currency}
                {overview.Exchange}
            </div>
            <button className="to_comparison">Add to Comparison</button>
            </div>
        </div>
    )
}

export default Chart
