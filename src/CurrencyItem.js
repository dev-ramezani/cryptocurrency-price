import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./App.css";

const CurrencyItem = ({ItemData}) => {
    const currencyAnimation = useRef(null);

    useEffect(() => {
      currencyAnimation.current.classList.add('visible');
    })

    return(
      <li className='item' ref={currencyAnimation} key={ItemData.market_cap_rank}>              
      <img src={ItemData.image} alt="logo" /><p>{ItemData.name}</p>
      <table>
        <thead>
            <th>Volume of transactions</th>
            <th>Currency price changes (in 24 hour)</th>
            <th>Price</th>
        </thead>
        <tbody>
            <tr>
              <td>${ItemData.total_volume}</td>
              <td ><span className={ ItemData.price_change_percentage_24h > 0 ? 'green' : 'red' }>% {ItemData.price_change_percentage_24h}</span></td>
              <td>${ItemData.current_price}</td>
            </tr>
        </tbody>
      </table>
    </li>
    )
}

CurrencyItem.propTypes = {
  ItemData: PropTypes.object,
}

export default CurrencyItem;