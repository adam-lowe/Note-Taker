const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

