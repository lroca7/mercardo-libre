const { response } = require("express");
const express = require("express");
const app = express();

const request = require("request");
const rp = require("request-promise-native");

const router = require("express").Router();
const fetch = require("node-fetch");
const axios = require('axios');

const API = "https://api.mercadolibre.com/";

// app.use(router);

/**
 * Buscar productos
 */
app.get("/api/items", (req, res) => {
  const query = req.query;

  const options = {
    uri: API + "sites/MLA/search?q=" + query.q,
    json: true,
  };

  rp(options)
    .then((response) => {
      const data = {
        author: {
          name: "Lizeth",
          lastname: "Rodriguez",
        },
      };
      const items = response.results;
      const filterItems = items.slice(0, 4);

      const newItems = filterItems.map((item) => {
        const newItem = {
          id: item.id,
          title: item.title,
          price: {
            currency: item.prices.prices[0].currency_id,
            amount: item.price,
            decimals: null,
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          address: item.address.state_name,
        };
        return newItem;
      });

      data["items"] = newItems;

      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

/**
 * Detalle producto
 */
app.get("/api/items/:id", async (req, res, next) => {
  

  const id = req.params.id;
  const responseOne = await getItem(id);
  const responseTwo = await getDescription(id);
  const finalResponse = {
    ...responseOne,
    'description' : responseTwo.plain_text
  }
  res.send(finalResponse)


});

function getItem(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const url = API + "/items/"+id;
      let updateResult = null;
      await axios
        .get(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {

          const data = {
            author: {
              name: "Lizeth",
              lastname: "Rodriguez",
            },
          };
          const item = response['data'];
    
          const newItem = {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.price,
              decimals: null,
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
          };
    
          data["item"] = newItem;

          updateResult = data;
        })
        .catch(function (error) {
          console.log(error);
        });
      resolve(updateResult);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }).catch((err) => {
    console.log(err);
  });
}

function getDescription(id) {
  return new Promise(async function (resolve, reject) {
    try {
      const url = API + "/items/"+id+"/description";
      let updateResult = null;
      await axios
        .get(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          updateResult = response['data'];
        })
        .catch(function (error) {
          console.log(error);
        });
      resolve(updateResult);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }).catch((err) => {
    console.log(err);
  });
}

app.listen(3000, () => console.log("Servidor listo ..."));
