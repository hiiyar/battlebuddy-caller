var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: process.env.ELASTIC_HOST || 'localhost:9200',
  log: process.env.ELASTIC_LOG || 'error'
});

module.exports = client;