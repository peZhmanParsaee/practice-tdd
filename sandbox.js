const fetch = require("node-fetch");
const config = require("./config");
const orderTotal = require("./order-total");

const result = orderTotal(fetch, config, {
  country: "DE",
  items: [{ name: "Dragon barbershop comb", price: 999, quantity: 3 }],
}).then((total) => console.log("total: ", total));
