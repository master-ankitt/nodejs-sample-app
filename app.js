const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'logoswayatt.png'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});