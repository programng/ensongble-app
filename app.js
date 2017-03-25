const express = require('express');

const app = express();
const port = process.env.PORT || 8080;;

app.use(express.static(__dirname + "/dist/"));

app.get('/helloworld', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
});

app.listen(port, (err) => {
  if (err) {
    return console.log('error: ', err)
  }
  console.log(`server is listening on ${port}`)
});
