// Fetch Rates - Base: EUR
function getRates() {
  fetch("https://api.exchangeratesapi.io/latest")
    .then(res => res.json())
    .then(data => {
      let rates = Object.keys(data.rates).sort(); // An array with all the currencies
      // console.log(rates);
      let from = document.getElementById("from");
      let to = document.getElementById("to");

      // Add select list for From
      from += `<option value="" disabled selected>Select</option>`;
      from += `<option value="${data.base}">${data.base}</option>`;

      // Add select list for To
      to += `<option value="" disabled selected>Select</option>`;
      to += `<option value="${data.base}">${data.base}</option>`;

      // Fill the lists
      for (let i = 0; i <= rates.length - 1; i++) {
        from += `<option value="${rates[i]}">${rates[i]}</option>`;
        to += `<option value="${rates[i]}">${rates[i]}</option>`;
      }

      // Add the lists to the DOM
      document.getElementById("from").innerHTML = from;
      document.getElementById("to").innerHTML = to;
    })
    .catch(error => {
      console.log(error);
    });
}

getRates(); // Get the lists

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();

  // How much money the user wants to convert
  let amount = document.getElementById("amount").value;
  // From which currency
  let from = document.getElementById("from").value;
  // To which currency
  let to = document.getElementById("to").value;

  // Request specific exchange rates according to the user's inputs
  fetch(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
    .then(res => res.json())
    .then(data => {
      // Compute the output with 5 digits after the comma
      output = (amount * data.rates[`${to}`]).toFixed(5);

      // Add the output to the DOM
      document.getElementById("output").innerHTML = `
          <p class="font-weight-normal">
            ${amount}
            <span class="font-weight-bold"> ${from}</span>
             =
            <h2>
              ${output} ${to}
            </h2>
          </p>
          <small>1 ${from} = ${data.rates[`${to}`]} ${to}</small>
        `;
    })
    .catch(error => {
      console.log(error);
    });
});
