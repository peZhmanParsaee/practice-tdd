const orderTotal = require("./order-total");
const config = require("./config");

it("should call vatsense api ", () => {
  let isFakeFetch = false;

  let fakeFetch = (url) => {
    expect(url).toBe("https://api.vatsense.com/1.0/rates?country_code=DE");
    isFakeFetch = true;
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {
            standard: {
              rate: 19,
            },
          },
        }),
    });
  };

  const order = {
    country: "DE",
    items: [{ name: "Dragon barbershop comb", price: 999, quantity: 3 }],
  };

  return orderTotal(fakeFetch, config, order).then((result) => {
    expect(result).toBe(999 * 3 * 1.19);
    expect(isFakeFetch).toBe(true);
  });
});

it("test.todo when country code is passed", () => {});

it("quantity", () => {
  const order = {
    items: [{ name: "Dragon fly", price: 99, quantity: 2 }],
  };

  orderTotal(null, null, order).then((result) => expect(result).toBe(198));
});

it("no quantity specified", () => {
  const order = {
    items: [{ name: "Dragon fly", price: 15 }],
  };

  orderTotal(null, null, order).then((result) => expect(result).toBe(15));
});

it("Happy path (example 1)", () => {
  const order = {
    items: [
      {
        name: "Dragon food",
        price: 8,
        quantity: 1,
      },
      {
        name: "Dragon cape",
        price: 800,
      },
    ],
  };

  orderTotal(null, null, order).then((result) => expect(result).toBe(808));
});
