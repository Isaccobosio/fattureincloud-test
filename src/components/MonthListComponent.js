import React from 'react'
import { MONTHS_AS_STRING } from '../constant/date'
import MonthItemComponent from './MonthItemComponent'

/**
 * 
 * @param {Array} months Month list to show
 * @param {function} onSelect Event called one a selection has complete. It returns a range {from, to}
 * @returns A table with month displayed
 */
export default function MonthListComponent({
  months = [],
  onSelect,
}) {
  const [isPicking, setIsPicking] = React.useState(false);
  const [pickingRange, setPickingRange] = React.useState({ from: 0, to: 0 });

  const onMouseUp = (idx) => {
    setIsPicking(false);
    onSelect(pickingRange);
  }

  const onMouseDown = (idx) => {
    setPickingRange({ ...pickingRange, from: idx, to: idx });
    setIsPicking(true);
  }

  const onMouseOver = (idx) => {
    if (!isPicking) return;
    setPickingRange({ ...pickingRange, to: idx });
  }

  const idxIsInPickingRange = (idx) => {
    let { from, to } = pickingRange;
    if (to == null) to = from;
    if (from > to) {
      let t = to;
      to = from;
      from = t;
    }
    if (idx >= from && idx <= to) return true;
  }

  const renderIsPickingMessage = () => (
    <div className={`is-picking-message ${!isPicking && 'hidden'}`}>
      Trascina per selezionare un intervallo di mesi
    </div>
  )

  return (
    <React.Fragment>
      <div className='months-list'>
        <table>
          <thead>
            <tr>
              {
                MONTHS_AS_STRING.map((el, idx) => (
                  <th key={idx}>
                    <div>
                      {el}
                    </div>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            <tr className='data-row'>
              {
                months.map((el, idx) => (
                  <MonthItemComponent key={idx}
                    idx={idx}
                    amount={el.importo}
                    docNumber={el.documenti}
                    height={el.height}
                    selected={el.selected}
                    onMouseOver={() => onMouseOver(idx)}
                    onMouseUp={() => onMouseUp(idx)}
                    onMouseDown={() => onMouseDown(idx)} />
                ))
              }
            </tr>
            <tr>
              {
                months.map((el, idx) => (
                  <td key={idx} style={{
                    borderTop: 'none',
                    borderBottom: 'none',
                    padding: 0,
                    height: 'auto'
                  }}>
                    <div style={{ height: '1px', backgroundColor: '#C6E7F5' }}></div>
                  </td>
                ))
              }
            </tr>
            <tr>
              {
                months.map((el, idx) => (
                  <td key={idx} style={{
                    borderTop: 'none',
                    borderBottom: 'none',
                    padding: 0,
                    height: 'auto'
                  }}>
                    <div style={{ height: '2px', backgroundColor: '#0D97D5' }}></div>
                  </td>
                ))
              }
            </tr>
            <tr>
              {
                months.map((el, idx) => (
                  <td key={idx} style={{
                    borderTop: 'none',
                    borderBottom: 'none',
                    padding: 0,
                    height: 'auto'
                  }}>
                    {
                      !isPicking && idxIsInPickingRange(idx) &&
                      <div style={{
                        height: '5px',
                        backgroundColor: '#00AA29',
                      }}></div>
                    }
                    {
                      isPicking && idxIsInPickingRange(idx) &&
                      <div style={{
                        height: '5px',
                        backgroundColor: '#adee06',
                      }}></div>
                    }
                  </td>
                ))
              }
            </tr>
          </tbody>
        </table>
      </div>
      {renderIsPickingMessage()}
    </React.Fragment>
  )
}
