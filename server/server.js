const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'build'), { cache: false }));

app.get('/', function(req, res) {
    // res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
