const express = require('express');
const spawn = require('child_process').spawn;

const app = express();
const port = process.env.PORT || 8080;;

app.use(express.static(__dirname + "/dist/"));

app.get('/helloworld', function (req, res) {
  const py = spawn('python', ['test.py']);
  let result;

  const data = [1,2,3,4,5,6,7,8,9];

  py.stdout.on('data', (data) => {
    console.log('data', data);
    result = data.toString();
    console.log('result', result);
  });
  py.stdout.on('end', () => {
    console.log('end python script');
    res.send(result)
  });
  py.stdin.write(JSON.stringify(data));
  py.stdin.end();

});

// app.post('/', function (req, res) {
//   res.send('Got a POST request')
// });

app.listen(port, (err) => {
  if (err) {
    return console.log('error: ', err)
  }
  console.log(`server is listening on ${port}`)
});
