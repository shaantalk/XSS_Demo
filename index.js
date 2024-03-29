const express = require("express");
const fs = require("fs");
const app = express();

const products = ["iPhone"];
app.use(express.json());

// <script>alert("Gotcha..You are hacked !!!! ")</script>

{
  /* <a href="http://localhost:8080/search?q=iPhone">Buy iPhone 15 for 20rs</a> */
}

{
  /* <a href='http://localhost:8080/search?q=<script>alert("Gotcha..You are hacked !!!! ");</script>'>Buy iPhone 15 for 20rs</a> */
}

//<!-- SEARCH -->

app.get("/search", (req, res) => {
  let ind = fs.readFileSync(__dirname + "/index.html");

  const s = "Could not find product " + req.query.q;
  ind = ind.toString().replace("<!-- SEARCH -->", s);
  res.setHeader("Content-Security-Policy", "script-src http://localhost:8080");
  // res.setHeader("Content-Security-Policy", "script-src 'none'");
  res.send(ind);
});

app.get("/js", (req, res) => {
  res.sendFile(__dirname + "/src.js");
});

app.get("/", (req, res) => {
  let ind = fs.readFileSync(__dirname + "/index.html");

  const s = products.reduce((a, c) => {
    return `${a}<li>${c}</li>`;
  }, "");
  ind = ind.toString().replace("<!-- LIST -->", s);
  res.setHeader("Content-Security-Policy", "script-src http://localhost:8080");
  // res.setHeader("Content-Security-Policy", "script-src 'none'");
  res.send(ind);
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.post("/products", (req, res) => {
  products.push(req.body.name);
  res.send({ success: true });
});

app.listen(8080);

console.log("Listen to 8080");

//res.setHeader("Content-Security-Policy", "script-src http://localhost:8080")
