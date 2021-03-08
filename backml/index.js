const { response } = require("express");
const express = require("express")
const app = express()

const request = require("request");
const rp      = require('request-promise-native');

const API = 'https://api.mercadolibre.com/'



// app.get('/api/items', function(req, res, next) {

//   const query = req.query;

//   request({
//     uri: API + 'sites/MLA/search?q=' + query.q,
//   }).pipe(res);
// });


/**
 * Buscar productos
 */
app.get('/api/items', (req, res) => {

  const query = req.query;

  const options = {
    uri: API + 'sites/MLA/search?q=' + query.q,
    json: true
  };

  rp(options)
  .then(response => {

      const data = {
        author: {
          name : 'Lizeth',
          lastname: 'Rodriguez'
        }
      } 
      const items = response.results;
      const filterItems = items.slice(0, 4);

      const newItems = filterItems.map((item) => {
        const newItem  = {
          id: item.id,
          title: item.title,
          price: {
            cuerrency: item.prices.prices[0].currency_id,
            amount: item.price,
            decimals: null
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          address: item.address.state_name
        }
        return newItem;
      })

      

      data['items'] = newItems;

      res.send(data);
  })
  .catch(err => {
      res.send(err);
  });
});

app.listen(3000, () => console.log("Servidor listo ..."))