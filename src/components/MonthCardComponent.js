import React from 'react'
import { currencyFormat } from '../services/util'

export default function MonthCardComponent({
  name,
  amount,
  docNumber,
  height,
  ...props
}) {
  return (
    <div className='month-card-selected'>
      <div className='month-card-container'>
        <div className='month-card-name'>{name}</div>
        <div className='amount month-card-amount'>{currencyFormat(amount)}</div>
        <div className='doc-number month-card-docNumber'>{docNumber} doc.</div>
      </div>
    </div>
  )
}
