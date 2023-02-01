console.clear();
/*
 * CRYPTO | CoinGecko v.2
 * doc:
 * build: 03.12.21 @22:35
 */
document.addEventListener("DOMContentLoaded", () => {
  fetchMe();
});

function fetchMe() {
  // API endpoints
  const cryptos = ["velas", "velaspad", "bitorbit", "solana"];
  const endpoints = {
    velas: `https://api.coingecko.com/api/v3/simple/price?ids=velas&vs_currencies=usd`,
    bitorbit: `https://api.coingecko.com/api/v3/simple/price?ids=bitorbit&vs_currencies=usd`,
    velaspad: `https://api.coingecko.com/api/v3/simple/price?ids=velaspad&vs_currencies=usd`,
    solana: `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
  };


  // url to fetch
  const url = endpoints.velas;

  // fetch options
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  };

  // 🥬 async-await & fetch API
  async function fetchAsyncAwait() {
    try {
      let response = await fetch(url, options);
      let data = await response.json();
      console.log(data); // expected output: {"bitcoin":{"usd":55035}}
      document.querySelector("#span").textContent = `$ ${formatNumber(data.velas.usd)}`;

      // error handling
    } catch (error) {
      console.log(`${error}`);
    } // end try
  } // fetchAsyncAwait()
  fetchAsyncAwait();

  function formatNumber(number) {
    if (!isFinite(number)) {
      return number;
    }
    let s = "" + number,
      abs = Math.abs(number),
      _,
      i;

    if (abs >= 1000) {
      _ = ("" + abs).split(/\./);
      i = _[0].length % 3 || 3;
      _[0] = s.slice(0, i + (number < 0)) + _[0].slice(i);
      s = _.join(".");
    }
    return s;
  } // end formatNumber()

} // end fetchMe
