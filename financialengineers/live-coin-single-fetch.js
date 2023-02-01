console.clear();
/*
 * CRYPTO | live coin v.2
 * doc: https://livecoinwatch.github.io/lcw-api-docs/?javascript#javascript
 * API tool: https://www.livecoinwatch.com/tools/api
 * build 03.12.21 @15:41
 */
document.addEventListener("DOMContentLoaded", () => {
  fetchMe();
});

function fetchMe() {
  console.log("fetching");
  // fetch
  const key = "64016ff5-1334-4070-8877-9d0a73ea3fc5",
    protocol = `https`,
    domain = `api.livecoinwatch.com`,
    endpoint = `/coins/list`,
    url = `${protocol}://${domain}${endpoint}`;

  // request
  const data = {
    currency: "USD",
    sort: "rank",
    order: "ascending",
    offset: 0,
    limit: 6,
    meta: false
  };

  // fetch definition
  async function postRequest(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": `${key}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } // end postRequest()

  // fetch expression
  postRequest(url, data).then((data) => {
    console.log(data[0].rate);
  });
} // end fetchMe()
