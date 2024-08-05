const express = require('express');
const app = express();
const port = 4000;

// Middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});