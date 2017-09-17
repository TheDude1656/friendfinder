var friends = require('../data/friends.js');

module.exports = function (app) {
    // Shows all people available to be friends
    //*****************************************/
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // define the post api/friends route
    app.post('/api/friends', function (req, res) {
        friends.push(req.body);
    });
};