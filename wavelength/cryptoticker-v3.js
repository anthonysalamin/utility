console.clear();
/*
 * LEELOO | Cryptoticker V.3
 * build: 18.12.21 @00:04
 */
document.addEventListener("DOMContentLoaded", () => {
  checkAPIstatus();
  // get data every 10s
  setInterval(() => {
    getCryptoData();
  }, 10 * 1000);
});

function checkAPIstatus() {
  // 🥬 fetch ping async/await
  async function fetchPing() {
    const response = await fetch("https://api.coingecko.com/api/v3/ping");
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  }

  fetchPing()
    .then((data) => console.log(`API status: ${data.gecko_says}`))
    .then(getCryptoData)
    .catch((error) => {
      console.log(error);
    });
} // end checkAPIstatus()

function getCryptoData() {
  // globals
  const api = "https://api.coingecko.com/api/v3/coins",
    currencies = ["velas", "velaspad", "bitorbit", "solana", "bitcoin"];
  let currenciesData = [];

  // save urls into new array
  const uris = currencies.map(
    (currency) => `${api}/${currency}?localization=false`
  );

  async function fetchData() {
    try {
      // save fetched data into new array
      const coins = await uris.map((uri) =>
        fetch(uri)
          .then((response) => checkStatus(response))
          .then((response) => parseJSON(response))
      ); // end coins constant

      Promise.all(coins)
        .then((data) => currenciesData.push(...data))
        .then(injectDataIntoDOM);
    } catch (error) {
      console.log(`error in fetchData(): ${error}`);
    } // end try catch
  } // end fetchData

  // helper check status
  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(
        console.error(`error, response status: ${response.status}`)
      );
    } // end if status.ok
  } // end checkStatus

  // helper parse JSON
  function parseJSON(response) {
    return response.json();
  } // end parseJSON

  // inject fetched data into DOM
  function injectDataIntoDOM() {
    const cards = document.querySelectorAll(".card-wrap");

    for (let i = 0; i < cards.length; i++) {
      // scoped
      const card = cards[i];
      const currencyData = {
        id: currenciesData[i].id,
        symbol: currenciesData[i].symbol,
        usd: currenciesData[i].market_data.current_price.usd,
        week:
          currenciesData[i].market_data.price_change_percentage_7d_in_currency
            .usd
      }; // end currencyData constant

      // inject data into DOM
      card.querySelector(
        ".text-card.symbol"
      ).textContent = currencyData.symbol.toUpperCase();
      card.querySelector(".card-price").textContent = `$${currencyData.usd}`;
      card.querySelector(".text-card.week").textContent = `${parseFloat(
        currencyData.week.toFixed(3)
      )}%`;
    } // end for loop

    // log updated time
    function getTime() {
      const today = new Date();
      return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    } // end getTime
    console.log(`✅ last updated: ${getTime()}`);
  } // end injectDataIntoDOM

  fetchData();
} // end getCryptoData()
