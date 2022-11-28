import React from 'react';
import './App.css';
import { MONTHS_AS_STRING } from './constant/date';
import { getData } from './services/restfulService';

function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [months, setMonths] = React.useState([]);

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
      selected: false,
      name: MONTHS_AS_STRING[idx],
      height: parseInt((100 * el.importo) / MAX_AMOUNT),
    }));
    setMonths(monthWhithName);
  }

  const displayData = () => (
    <div>
      {
        months.map((month, idx) => (
          <div key={idx}>
            <span>Documenti: {month.documenti}</span>
            <span>Importo: {month.importo}</span>
            <span>selezionato: {month.selected}</span>
            <span>nome: {month.name}</span>
            <span>Altezza: {month.height}</span>

          </div>
        ))
      }
    </div>
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
