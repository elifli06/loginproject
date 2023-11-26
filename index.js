//import section and create server in 5000 port.
import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5000;
var kullaniciSifre = false;
//bodyparser middleware use
app.use(bodyParser.urlencoded({ extended: true }));
//middleware create
function sifreEsle(req, res, next) {
  const sifre = req.body['sifre'];
  if (sifre === 'Veyselif') {
    kullaniciSifre = true;
  } else {
    kullaniciSifre = false;
  }
  next();
}
app.use(sifreEsle);

app.get('/', (req, res) => {
  // console.log(__dirname);
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/giris', (req, res) => {
  const sifre = req.body['sifre'];
  if (kullaniciSifre === true) {
    res.sendFile(__dirname + "/public/kullanici.html");
  } else {

    res.sendFile(__dirname + "/public/yanlis.html");
  }
});
app.listen(port, () =>
  console.log(`Server Oluştu Kullanılan Port : ${port}`),
);