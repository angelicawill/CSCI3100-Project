require('dotenv').config();
const express = require('express');
const app = express();
var router = express.Router();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("wow");
});

app.listen(port, () => {
    console.log("server running on port: " + port);
});

router.get('/', function(req, res, next) {
  const users = req.app.locals.users;

  users.find().limit(3).toArray((err, recent) => {
    res.render('index', { recent } );
  });
});

module.exports = router; 
