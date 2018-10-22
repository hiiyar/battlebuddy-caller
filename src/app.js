const express = require('express')
const app = express()
const PUBGUserService = require('./pubg/services/users');

app.listen(5001, function(){

    setInterval(PUBGUserService.updateAllUserDetails, 5000);

});