const express = require('express');

const app = express();
const port = process.env.PORT || 8080;;

app.use(express.static(__dirname + "/dist/"));

app.listen(port, (err) => {
  if (err) {
    return console.log('error: ', err)
  }
  console.log(`server is listening on ${port}`)
});
