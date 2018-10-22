const axios = require('axios')

const instances = {
    'pubg' : axios.create({
        baseURL: process.env.PUBG_API_BASEURL || 'https://api.playbattlegrounds.com/shards',
        headers: {
            'Authorization': 'Bearer ' + (process.env.PUBG_API_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiODFjNjIzMC1hZTBmLTAxMzYtY2I1Zi0wN2NiYmEyMzM3ZDEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTM5MTAzMTI3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImRpb2dvbWFpbmFyZGVzIn0.of0n-nX9Aa6Sk5rGvFjAZBE2_pw6phKauIO2kItpb6Y'),
            'Accept' : 'application/vnd.api+json'
        }
    })
}

module.exports = instances;