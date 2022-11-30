import React from 'react';
import { currencyFormat } from '../services/util';
import './componentsStyle.css';

/**
 * 
 * @param {number} idx Index of Month in monthList
 * @param {number} amount Billed amount of month 
 * @param {number} docNumber Number of doc of month
 * @param {number} height Relative height. this value must be between 0 and 100
 * @param {function} onMouseDown Handle of onMouseDown event
 * @param {function} onMouseUp Handle of onMouseUp event
 * @param {function} onMouseOver Handle of onMouseOver event
 * @returns a month item which shows its amount and doc number
 */
export default function MonthItemComponent({
  idx,
  amount,
  docNumber,
  height,
  onMouseDown,
  onMouseUp,
  onMouseOver
}) {

  React.useEffect(() => {
    setTimeout(() => {
      document.getElementById('green-light-' + idx).style.height = height + '%';
    }, 250);
  }, []);

  return (
    <td className='month-container'
      onMouseOver={() => onMouseOver()}
      onMouseDown={() => onMouseDown()}
      onMouseUp={() => onMouseUp()}>
      <div className='datas'>
        <div className='doc-number'>{docNumber} doc.</div>
        <div className='amount'>{currencyFormat(amount)}</div>
      </div>
      <div id={'green-light-' + idx}
        className='green-light'></div>
    </td>
  )
}