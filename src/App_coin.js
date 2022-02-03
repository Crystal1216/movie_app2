import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinPrice, setCoinPrice] = useState(0);
  const [dollar, setDollar] = useState(0);
  const [bit, setBit] = useState(0);
  const onChange = (event) => setDollar(event.target.value);
  const onSelect = (event) => setCoinPrice(event.target.value);
  const onCal = () => {
    setBit(dollar === 0 ? 0 : Math.floor(dollar / coinPrice));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select onChange={onSelect}>
            <option value="0">Select Coin Type</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <input type="number" value={dollar} onChange={onChange} />
        <button onClick={onCal}>Convert</button>
      </div>
      <div>
        <h3>You can buy {bit === 0 ? 0 : bit}</h3>
      </div>
    </div>
  );
}

export default App;
