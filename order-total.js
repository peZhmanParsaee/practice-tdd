function orderTotal(fetch, config, order) {
  const sumOrderItems = (order) =>
    order.items.reduce(
      (prev, cur) => cur.price * (cur.quantity || 1) + prev,
      0
    );

  if (order.country) {
    return fetch(
      "https://api.vatsense.com/1.0/rates?country_code=" + order.country,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(config.VAT_API_KEY).toString("base64"),
        },
      }
    )
      .then((response) => response.json())
      .then((result) => result.data.standard.rate)
      .then((vat) => sumOrderItems(order) * (vat / 100 + 1));
  }

  return Promise.resolve(sumOrderItems(order));
}

module.exports = orderTotal;
