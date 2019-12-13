const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();

// Express Middlewares:
app.use(bodyParser.json());

require('./routes/linkStationRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js, or main.css file!
  app.use(express.static('client/build'));
  // Express will serve up the index.html file
  // if it doesn't recognise the route.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT); // To run server: npm run start || npm run dev
