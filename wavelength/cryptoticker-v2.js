console.clear();
/*
 * LEELOO | Cryptoticker V.2
 * build: 07.12.21 @00:28
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

/////////////////////////////////

function getCryptoData() {
  // globals
  const api = "https://api.coingecko.com/api/v3/coins",
    currencies = ["velas", "velaspad", "bitorbit", "solana", "bitcoin"];

  const uris = currencies.map(
    (currency) => `${api}/${currency}?localization=false`
  ); // for each currency, prepend the api & saved them in a new array

  // empty array to push data after fetching
  let currenciesData = [];

  function fetchUris() {
    Promise.all(
      uris.map((uri) =>
        fetch(uri)
          .then(checkStatus) // check API response
          .then(parseJSON) // parse it to Json
          .catch((error) => console.log(error))
      )
    )
      .then((data) => currenciesData.push(...data)) // data being an array object
      .then(injectDataIntoDOM);
  } // end fetchUris()

  fetchUris();

  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    } // end if status.ok
  } // end checkStatus

  function parseJSON(response) {
    return response.json();
  } // end parseJSON

  function injectDataIntoDOM() {
    const cards = document.querySelectorAll(".card-wrap");

    for (let i = 0; i < cards.length; i++) {
      // raw data
      const currencyData = {
        id: currenciesData[i].id,
        symbol: currenciesData[i].symbol,
        usd: currenciesData[i].market_data.current_price.usd,
        week:
          currenciesData[i].market_data.price_change_percentage_7d_in_currency
            .usd
      }; // end raw data

      // inject data into DOM
      const card = cards[i];
      
      card.querySelector(
        ".text-card.symbol"
      ).textContent = currencyData.symbol.toUpperCase();
      card.querySelector(".card-price").textContent = `$${currencyData.usd}`;
      card.querySelector(".text-card.week").textContent = `${parseFloat(
        currencyData.week.toFixed(3)
      )}%`;
    } // end for loop

    function getTime() {
      const today = new Date();
      return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    } // end getTime
    console.log(`last updated: ${getTime()}`);
    
  } // end injectDataIntoDOM
  
} // end getCryptoData()
