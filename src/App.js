import React, { useEffect, useState } from 'react';
import CurrencyItem from './CurrencyItem';
import './App.css';

function App() {
  const [currencyData,setCurrencyData] = useState([]);
  const [pageCount,setPageCount] = useState(0);
  const [activePage,setActivePage] = useState(1);
  const [loading,setLoading] = useState(false);

  const pageManager = () => {
      if( currencyData.length % 15 > 0 ){
        return parseInt( currencyData.length / 15 + 1 ) }
      else{ return parseInt( currencyData.length / 15 ) }
  }
  
  const changePage = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const recieveAPI = async () => {
      setLoading(true);
      const currencyResponsive = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&sparkline=false');
      const cryptoCurrencyData = await currencyResponsive.json();
      setCurrencyData(cryptoCurrencyData);
      setLoading(false);
  }

  useEffect(() => {
    setPageCount(pageManager())
  },[currencyData])

  useEffect(() => {
    recieveAPI();
  },[])

  return(
    <div className='App'>
      <h1 className='title'>Cryptocurrency Price</h1>
      <p className='help'>If this page does not work for you, please turn on your VPN and refresh the page again.</p>
      { loading ? <p className='load'>Loading...</p> :
      <div> 
        <button className='refresh' onClick={() => recieveAPI()}>Refresh</button>
        <ul className='currency'>
        { currencyData.slice( 15 * ( activePage - 1 ) , 15 * activePage ).map((Item) => (
          <CurrencyItem key={Item.market_cap_rank} ItemData={Item} />
        ))}
        </ul>
        <ul className='pageCounter'>
          { new Array(pageCount).fill(0).map((item,index) => (
              <li key={index.toString()} className='pageCounter'><button className={ activePage === index + 1 ? 'active' : 'normal' } onClick={() => changePage( index + 1 )}>{index + 1}</button></li>
          ))}
        </ul>
      </div> 
      }
    </div>
  )
}

export default App;