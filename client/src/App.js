import { useEffect, useState } from 'react';

const statusString = (statusValue) => {
  switch (statusValue) {
    case -1: return "too low"
    case 0: return "all good"
    case 1: return "too high"
  }
}

const POLLING_INTERVAL = 5000

function App() {
  const [items, setItems] = useState({});

  useEffect(() => {
    const request = () =>
      fetch(`http://localhost:8081/temperatures/`)
        .then((response) => response.json())
        .then((response) =>
          setItems((prevItems) => ({
            ...response
          }))
        );

    setInterval(request, POLLING_INTERVAL);

    request();
  }, []);

  return (
    <div className="App">
      <h2>Beers</h2>
      <table>
        <thead>
          <tr>
            <th align="left">Product</th>
            <th align="left">Temperature</th>
            <th align="left">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items).map((itemKey) => (
            <tr key={items[itemKey].id}>
              <td width={150}>{items[itemKey].name}</td>
              <td width={150}>{items[itemKey].temperature}</td>
              <td width={150}>
                <span>{statusString(items[itemKey].status)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
