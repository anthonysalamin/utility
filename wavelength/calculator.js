/*
 * CRYPTO | calculator v.3
 * build: 02.12.2021 @ 19:11
 */
document.addEventListener("DOMContentLoaded", () => {
  calculatorSlider();
});

function calculatorSlider() {
  const currencies = {
    apy: "USD",
    liquidity: "VLX"
  };
  const setup = {
    apy: {
      min: 100,
      max: 1000000,
      from: 150000,
      step: 100,
      prefix: "$",
      small: "Daily",
      medium: "Monthly",
      big: "Yearly"
    },
    liquidity: {
      min: 1000,
      max: 1000000,
      from: 300000,
      step: 1000,
      prefix: "VLX ",
      small: "3 months",
      medium: "6 months",
      big: "1 year"
    }
  };

  // set initial legends
  document.querySelector("#stake-currency").textContent = currencies.apy;
  document.querySelector("#stake-amount").textContent = setup.apy.from;
  document.querySelector("#small").textContent = setup.apy.small;
  document.querySelector("#medium").textContent = setup.apy.medium;
  document.querySelector("#big").textContent = setup.apy.big;

  // set initial config
  let config = {
    skin: "round",
    grid: false,
    prettify_separator: ".",
    min: setup.apy.min,
    max: setup.apy.max,
    from: setup.apy.from,
    step: setup.apy.step,
    prefix: setup.apy.prefix,
    force_edges: true,
    onStart: (data) => {
      // set slider value
      $(".js-input").prop("value", data.from);
    }, // end onStart
    onChange: (data) => {
      // update slider and big number
      $(".js-input").prop("value", data.from);
      document.querySelector("#stake-amount").textContent = data.from;
    } // end onChange
  }; // end config
  
  // initialise instance
  $("#money").ionRangeSlider(config);
  // save instance to variable
  let moneySlider = $("#money").data("ionRangeSlider");

  // handle click
  const inputs = document.querySelectorAll(".input");
  Array.from(inputs).forEach((input) => {
    input.addEventListener("click", () => {
      if (input.id == "apy") {
        
        // set legends after "apy" click
        document.querySelector("#stake-currency").textContent = currencies.apy;
        document.querySelector("#stake-amount").textContent = setup.apy.from;
        document.querySelector("#small").textContent = setup.apy.small;
        document.querySelector("#medium").textContent = setup.apy.medium;
        document.querySelector("#big").textContent = setup.apy.big;
        
        // update slider after "apy" click
        moneySlider.update({
          min: setup.apy.min,
          max: setup.apy.max,
          from: setup.apy.from,
          step: setup.apy.step,
          prefix: setup.apy.prefix,
          onStart: (data) => {
            // set slider after "apy" click
            $(".js-input").prop("value", data.from);
          }, // end onStart
          onChange: (data) => {
            // update slider and big number after "apy" click
            $(".js-input").prop("value", data.from);
            document.querySelector("#stake-amount").textContent = data.from;
          } // end onChange
        }); // end moneySlider.update
      } else {
        // set legends after "liquidity" click
        document.querySelector("#stake-currency").textContent =
          currencies.liquidity;
        document.querySelector("#stake-amount").textContent =
          setup.liquidity.from;
        document.querySelector("#small").textContent = setup.liquidity.small;
        document.querySelector("#medium").textContent = setup.liquidity.medium;
        document.querySelector("#big").textContent = setup.liquidity.big;
        
        // update slider after "liquidity" click
        moneySlider.update({
          min: setup.liquidity.min,
          max: setup.liquidity.max,
          from: setup.liquidity.from,
          step: setup.liquidity.step,
          prefix: setup.liquidity.prefix,
          onStart: (data) => {
            // set slider after "liquidity" click
            $(".js-input").prop("value", data.from);
          }, // end onStart
          onChange: (data) => {
            // update slider and big number after "liquidity" click
            $(".js-input").prop("value", data.from);
            document.querySelector("#stake-amount").textContent = data.from;
          } // end onChange
        }); // end moneySlider.update
      } // end if button id
    }); // end click listener toggle
  }); // end forEach toggle
} // end calculatorSlider()
