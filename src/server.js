const express = require('express');
const app = express();
const path = require('path');
const _ = require("lodash");

app.use(express.static('static'));

app.get('/buttons', (req, res) => {
  const buttonsConfig = _.cloneDeep(require("../config/buttons.config"));
  const experiments = require("../config/abTest.config.json").experiments;
  const TestConfigUtil = require("./server/util/TestConfig");

  res.json(TestConfigUtil.getButtonsConfig(buttonsConfig, experiments, req.query));
});

// main route
app.get('*', (req, res) => {
  console.log('got request');
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// app start up
module.exports = app