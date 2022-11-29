import React from 'react';
import './App.css';
import MonthCardComponent from './components/MonthCardComponent';
import MonthComponent from './components/MonthItemComponent';
import MonthListComponent from './components/MonthListComponent';
import { MONTHS_AS_STRING } from './constant/date';
import { getData } from './services/restfulService';

function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [months, setMonths] = React.useState([]);
  const [pickingRange, setPickingRange] = React.useState({ from: 0, to: 0 });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    getData()
      .then(({ mesi }) => {
        if (mesi == null) throw 'No data provided';
        setIsLoading(false);
        setUpData(mesi);
      })
      .catch((error) => {
        console.error('[ERROR]', error);
        setIsLoading(false);
        alert(`App throw exception. Message: ${error}`);
      })
  }

  const findMaxAmount = (arr) => {
    const amounts = arr.map((object) => {
      return object.importo;
    });
    return Math.max(...amounts);
  }

  const setUpData = (monthsData) => {
    const MAX_AMOUNT = findMaxAmount(monthsData);
    let monthWhithName = monthsData.map((el, idx) => ({
      ...el,
      inRange: false,
      height: parseInt((100 * el.importo) / MAX_AMOUNT),
    }));
    setMonths(monthWhithName);
  }

  const getMonthsRange = (from, to) => {
    return months.slice(from, to + 1);
  }

  const renderSelected = () => {
    let { from, to } = pickingRange;
    if (to == null) to = from;
    if (from > to) {
      let t = to;
      to = from;
      from = t;
    }
    return (
      <div>
        <h3>Mesi selezionati</h3>
        <div className='grid-months-selected'>
          {
            getMonthsRange(from, to)
              .map((el, idx) => (
                <MonthCardComponent key={idx}
                  name={MONTHS_AS_STRING[from + idx]}
                  amount={el.importo}
                  docNumber={el.documenti}
                  height={el.height} />
              ))
          }
        </div>
      </div>
    )
  }

  const displayData = () => (
    <React.Fragment>
      <MonthListComponent months={months}
        onSelect={(pickingRange) => setPickingRange(pickingRange)} />
      {renderSelected()}
    </React.Fragment>
  )

  return (
    <div className="app">
      <div className='container'>
        {
          isLoading
            ? <h1>Caricamento dati</h1>
            : displayData()
        }
      </div>
    </div>
  );
}

export default App;
