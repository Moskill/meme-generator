import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const __DIR__ = path.resolve();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  console.log('Fick den schiesss mannnn')
  res.status(200).send()
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload');
    console.log('Nodemon funzt');
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
    return res.status(200).send(req.file)
  })
});

app.get('/upload/:file', (req, res) => {
  res.send(req.params.file);
})

app.listen(8000, () => {
  console.log('App is running on port 8000');
})
