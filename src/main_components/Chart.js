import React from 'react';
import { useState , useEffect} from 'react/cjs/react.development';
import '../css/App.css';
import {Line} from 'react-chartjs-2';

const Chart = () => {

    const [symbol, setSymbol] = useState('');
    const [overview, setOverview] = useState({
        Name:'',
        Exchange:'',
        Currency:''
    })
    let linkDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;
    let linkOverview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=YJ0EZ107WVSIQNS1`;

    let [mappedPrice, setMappedPrice] = useState([]);
    let [mappedDate, setMappedDate] = useState([]) ;
    
    const [sumbitted, setSubmitted] = useState(false);

    const getSymbol = (e) =>{
        let symbolInput = e.target.value.toUpperCase();
        setSymbol(symbolInput);
    }

    async function getData (e){
        e.preventDefault();
        const data = await fetch(linkDaily);
        const daily = await data.json();

        let fetchedDaily = daily['Time Series (Daily)'];  
        let arrayFetchedDaily = Object.entries(fetchedDaily);
        
        setMappedPrice(arrayFetchedDaily.map((item)=>{
            return parseFloat(item[1]['4. close']);
        }).reverse())

        setMappedDate(arrayFetchedDaily.map((item)=>{
            return item[0];
        }).reverse())

        console.log(mappedPrice);
        console.log(mappedDate);

        
    
        const overview = await fetch(linkOverview);
        const fetchedOverview = await overview.json();


        const {Name, Exchange, Currency} = fetchedOverview;
        console.log(Name, Exchange, Currency);
        setOverview({Name,Exchange,Currency})

        setSubmitted(true);
        
        return {};
    }

    
    let state = {
        labels: mappedDate,
        datasets: [
            {
            label: 'Price',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: mappedPrice
            }
        ]
        }
    

    return (
        <div className="Chart">
            <div className="MainChart">
            <div className="choose">
                <form className="form_chart" onSubmit={getData}>
                    <input type="text" className="symbol" value={symbol} onChange={getSymbol}></input>
                    <button type="submit" className="btn">Search</button>
                </form>
            </div>
            <div className="chart">
                {console.log(mappedPrice)}
                    {
                        
                       
                    sumbitted && <Line data={state} options={{
                    title:{
                    display:true,
                    text:'Stock price',
                    fontSize:40
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }} />
            }
                
            </div>
            <div className="description">
                <span><span className="prefix">Company Name: </span>{overview.Name}</span>
                <span><span className="prefix">Exchange: </span>{overview.Exchange}</span>
                <span><span className="prefix">Currency: </span>{overview.Currency}</span>
            </div>
            <button className="to_comparison">Add to Comparison</button>
            </div>
        </div>
    )
}

export default Chart
