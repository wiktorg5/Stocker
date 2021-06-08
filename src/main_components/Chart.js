import React from 'react';
import { useState } from 'react/cjs/react.development';
import '../css/App.css'

const Chart = () => {

    const [symbol, setSymbol] = useState('');
    let linkDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;
    let linkOverview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`

    const getSymbol = (e) =>{
        let symbolInput = e.target.value.toUpperCase();
        setSymbol(symbolInput);
        console.log(symbol);
    }

    async function getDataDaily (e){
        e.preventDefault();
        const data = await fetch(linkDaily);
        const fetched = await data.json();

        console.log(fetched);
        
        return fetched;
    }

    async function getDataOverview (e){
        e.preventDefault();
        const data = await fetch(linkOverview);
        const fetched = await data.json();

        console.log(fetched);
        
        return fetched;
    }

    return (
        <div className="Chart">
            <div className="MainChart">
            <div className="choose">
                <form onSubmit={getDataDaily}>
                    <input type="text" className="symbol" value={symbol} onChange={getSymbol}></input>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="chart"></div>
            <div className="description"></div>
            <button className="to_comparison">Add to Comparison</button>
            </div>
        </div>
    )
}

export default Chart