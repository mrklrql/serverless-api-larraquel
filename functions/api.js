const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/recipeRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dbCloudUrl = 'mongodb+srv://paulolarraquel7:jH46i0Jyk0Hlu21O@larraquel-db.mrli844.mongodb.net/apidb';

const dbLocalUrl = 'mongodb://localhost:27017/recipe-db'; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(dbCloudUrl || dbLocalUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
