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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl", (req, res) => {
  console.log(req)
  if (req.body.url) {
    dns.lookup(req.body.url, (err) => {
      if (err) {res.json({error: "invalid url dns lookup"})}
      else {
        const url = old.toString();
        store.push(url);
        res.json({
          original_url: url,
          short_url: (store.length)
        });
      }
    });
  } else {
    res.json({error: "invalid url parameter"});
  }
});

app.get("/api/shorturl/:id", (req, res) => {  
  return res.redirect(store[parseInt(req.params.id) - 1]);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
