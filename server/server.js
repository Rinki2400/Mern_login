const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connect = require('./database/connection.js');
const router = require('./router/routes.js');

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Routes
app.use('/api', router);

// Start server only after DB connection
connect().then(() => {
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Failed to start server due to DB error");
});