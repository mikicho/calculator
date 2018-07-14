const express = require('express');
const app = express();
const path = require('path');
const lodash = require("lodash");

app.use(express.static('static'));

app.get('/buttons', (req, res) => {
  const buttonsConfig = require("../config/buttons.config");
  const experiments = require("../config/abTest.config.json").experiments;

  experiments.forEach(experiment => {
    experiment.variations.forEach(variation => {
      const configIndex = lodash.findIndex(buttonsConfig, ["name", variation.name]);      

      if(variation.color) {
        buttonsConfig[configIndex].color = variation.color;
      }

      if(variation.switchWith) {
        const switchWithIndex = lodash.findIndex(buttonsConfig, ["name", variation.switchWith]);      
        [buttonsConfig[configIndex], buttonsConfig[switchWithIndex]] = [buttonsConfig[switchWithIndex], buttonsConfig[configIndex]]
      }
    });
  });

  res.json(buttonsConfig);
});

// main route
app.get('*', (req, res) => {
  console.log('got request');
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// app start up
module.exports = app