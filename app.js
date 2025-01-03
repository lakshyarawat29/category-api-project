const express = require('express');
const mongoose = require('mongoose');

const createCategory = require('./routes/create.route');
const categoryRoute = require('./routes/category.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/category', categoryRoute);
app.use('/api/create', createCategory);

mongoose
  .connect(
    'mongodb+srv://lr29freelancer:oaemRemYERh1icNF@backenddb.thles.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB'
  )
  .then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
      console.log('server running on port 3000');
    });
  })
  .catch(() => {
    console.log('Connection Failed');
  });

//hGfXvDkSFC7qrbVr
