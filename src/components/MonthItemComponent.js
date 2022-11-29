import React from 'react';
import { currencyFormat } from '../services/util';
import './componentsStyle.css';

export default function MonthItemComponent({
  idx,
  amount,
  docNumber,
  height,
  onMouseDown,
  onMouseUp,
  onMouseOver,
  ...props
}) {

  return (
    <td className='month-container'
      onMouseOver={() => onMouseOver()}
      onMouseDown={() => onMouseDown()}
      onMouseUp={() => onMouseUp()}>
      <div className='datas'>
        <div className='doc-number'>{docNumber} doc.</div>
        <div className='amount'>{currencyFormat(amount)}</div>
      </div>
      <div className='green-light'
        style={{
          height: height + "%"
        }}></div>
    </td>
  )
}