const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const tmp = require('tmp');
const spawn = require('child_process').spawn;
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8080;;
const upload = multer();

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());

app.get('/test', (req, res) => {
  res.send('hi');
});

app.get('/demoMusic/:movieId', (req, res) => {
  res.send(req.params.movieId);
});

app.post('/prediction', upload.fields([{'name': 'files'}, {'name': 'meoww'}, {'name': 'meow'}, {'name': 'woof'}]), (req, res) => {
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

  const pythonExe = 'python';
  const py = spawn(pythonExe, [path.join(__dirname, 'dist', 'predict.py')]);
  let result;

  py.stdout.on('data', (data) => {
    console.log('stdout', data);
    console.log(typeof data);
    console.log(data.toString());
    result = replaceAll(data.toString(), "'", '"');
    console.log('node file result', result);
  });
  py.stdout.on('end', () => {
    console.log('end python script');
    res.send(result)
  });
  py.stderr.on('data', (data) => {
    console.log('error to string', data.toString());
  });
  py.stdin.write(JSON.stringify(file_names));
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
