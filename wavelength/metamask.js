console.clear();

/*
 * LEELOO | metaMask v.10
 * doc: https://docs.metamask.io/guide/ethereum-provider.html#legacy-events
 * build: 14.12.21 @16:25
 */

window.addEventListener("load", () => {
  accessDecentralizedWeb();
}); // end Window loaded

function accessDecentralizedWeb() {
  // globals
  const log = console.log;

  /*****************************************/
  /* Detect the MetaMask Ethereum provider */
  /*****************************************/

  async function getProvider() {
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();
    return provider;
  } // end getProvider

  getProvider()
    .then((provider) => {
      if (provider) {
        log("Ethereum successfully detected!");
        startApp(provider); // Initialize your app
      } else {
        log("🦊 Please install MetaMask!");
      } // end if
    })
    .catch((error) => {
      console.log(`error in getting provider: ${error}`);
    });

  function startApp(provider) {
    log(
      `Starting app, provider: ${
        provider.isMetaMask ? "MetaMask" : "not MetaMask"
      }`
    );
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!

    /**********************************************************/
    /* Handle chain (network) and chainChanged (per EIP-1193) */
    /**********************************************************/

    // ⚠️ it keeps reloading the page, in other words
    // the chainId keeps changing, why ? ⚠️
    /*
    async function getChainId() {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      return chainId;
    } // end getProvider

    getChainId()
      .then((chainId) => {
        handleChainChanged(chainId);
      })
      .catch((error) => {
        log(`error in getChainId(): ${error}`);
      });

    function handleChainChanged(_chainId) {
      log(`chain id: ${_chainId}`);
      // We recommend reloading the page, unless you must do otherwise
      // window.location.reload(); // ⚠️
    }

    ethereum.on("chainChanged", handleChainChanged);
    */

    /***********************************************************/
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /***********************************************************/

    let currentAccount = null;
    ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((error) => {
        console.error(error);
      });

    // For now, 'eth_accounts' will continue to always return an array
    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        log("🦊 Please connect to MetaMask.");
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        log(`current account: ${currentAccount}`);
        getCurrentAccountBalance();
      } // end if
    } // end handleAccountsChanged(accounts)

    ethereum.on("accountsChanged", handleAccountsChanged);

    /*********************************************/
    /* Access the user's accounts (per EIP-1102) */
    /*********************************************/

    const button = document.querySelector("#connectButton");
    button.addEventListener("click", connect);

    function connect() {
      log("connect button clicked");
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccountsChanged)
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            log("🦊 Please connect to MetaMask.");
          } else {
            console.error(`error in connect(): ${error}`);
          } // end if
        }); // end ethereum.request
    } // end connect
  } // end startApp(provider)

  function getCurrentAccountBalance() {
    console.log("getting current account balance");
    const eth = new Eth(window.ethereum);
    eth.accounts(function (error, accounts) {
      // clause guard
      if (error) {
        log(`error in eth.accounts: ${error}`);
        return;
      }

      eth.getBalance(accounts[0], function (error, balance) {
        // clause guard
        if (error) {
          log(`error in eth.getBalance: ${error}`);
          return;
        }
        const addressBalance = {
          address: accounts[0],
          balance: `${Eth.fromWei(balance, "ether")} Ether`
        };
        log(addressBalance);
      }); // end eth.getBalance
    }); // end eth.accounts
  } // end getCurrentAccountBalance()
} // end init()
