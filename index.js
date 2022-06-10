require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');
const store = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl", (req, res) => {
    const look = new URL(req.body.url);
    dns.lookup(look.hostname, (err) => {
      if (err) {res.json({error: "invalid url"})}
      else {
        store.push(look.href);
        res.json({
          original_url: look.href,
          short_url: (store.length)
        });
      }
    });
  })

app.get("/api/shorturl/:id", (req, res) => {
  const resolve = store[parseInt(req.params.id) - 1];
  return resolve ? res.redirect(resolve) : res.json({error: "invalid url"});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
