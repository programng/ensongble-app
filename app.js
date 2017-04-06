const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const tmp = require('tmp');
// const childProcess = require('child_process');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8080;;
const upload = multer();
let childProcess;
(function() {
    childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

app.use(express.static(path.join(__dirname, 'dist')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.raw());
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.raw({ type: 'audio/wav', limit: '100mb' }));

app.use(cors());

app.get('/test', (req, res) => {
  res.send('hi');
});

app.get('/demoMusic/:movieId', (req, res) => {
  res.send(req.params.movieId);
});

app.post('/prediction', upload.fields([{'name': 'files'}, {'name': 'meoww'}, {'name': 'meow'}, {'name': 'woof'}]), (req, res) => {
  console.log('hit /prediction endpoint');
  const files = req.files.files;
  let file_names = [];
  for (let i = 0; i < files.length; i += 1) {
    const file_extension = files[i].mimetype.split('/')[1];
    const buffer = files[i].buffer;
    const tmpobj = tmp.fileSync({postfix: `.${file_extension}`});
    // const tmpobj = tmp.fileSync({postfix: '.wav'});
    fs.writeFileSync(tmpobj.name, buffer);
    file_names.push(tmpobj.name);
    console.log(`${i}: ${tmpobj.name}`);
  }
  console.log('file_names', file_names);

  const py = childProcess.spawn('python', [path.join(__dirname, 'dist', 'predict.py')]);
  let result;

  py.stdout.on('data', (data) => {
    console.log('stdout', data);
    console.log(typeof data);
    console.log(data.toString());
    result = replaceAll(data.toString(), "'", '"');
    console.log('node file result', result);
    res.send(result)
  });
  py.stdout.on('end', () => {
    // console.log('end python script');
  });
  // data = [tmpobj.name];
  // py.stdin.write(JSON.stringify(data));
  py.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log('error', data);
    console.log('error to string', data.toString());
  });
  console.log('about to stdin.write');
  py.stdin.write(JSON.stringify(file_names));
  console.log('about to stdin.end');
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
