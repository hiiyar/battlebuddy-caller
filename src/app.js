const userServices = require('./pubg/services/users');

try {

    userServices.updateAllUserDetails()
        .then(function(e){
            console.log(e);
        }).catch(function(e){
            console.log(e);
        });

} catch (e) {
    console.log(e);
}
