const express = require('express');
const path = require('path');
const app = express();

// ✅ Add Winston + CloudWatch
const winston = require('winston');
require('winston-cloudwatch');

// Configure logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),  // logs in console
    new winston.transports.Cloudwatch({
      logGroupName: 'nodejs-sample-app-logs',   // your CloudWatch Log Group
      logStreamName: 'app-stream',              // log stream name
      awsRegion: 'ap-south-1'                   // your AWS region (change if needed)
    })
  ]
});

// ✅ Example usage
logger.info('App is starting...');

app.get('/', (req, res) => {
  logger.info('Home route accessed');  // log to cloudwatch
  res.sendFile(path.join(__dirname, 'logoswayatt.png'));
});

app.listen(3000, () => {
  logger.info('Server running on http://localhost:3000');
  console.log('Server running on http://localhost:3000');
});
