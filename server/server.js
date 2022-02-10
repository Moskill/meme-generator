import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const __DIR__ = path.resolve();

const app = express();


// File open
app.get('/upload/:pic', (req, res) =>{
  fs.readFile(`upload/${req.params.pic}`,  (err, data) => {
    res.send(data)
  });
});
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send()
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({storage}).single('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      console.log('Kackfehler!')
      return res.status(500).json(err)
    }
    console.log(req.file)
    fs.readFile(__DIR__ + req.file.originalname, (err, content) => {

        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(content)
      
    })
    return res.status(200).send(req.file)
  })
});

app.get('/upload/:file', (req, res) => {
  res.send(req.params.file);
})

app.listen(8000, () => {
  console.log('App is running on port 8000');
})
