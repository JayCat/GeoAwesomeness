var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use( bodyParser());

var polls = {};

app.get('/', function(req, res) {
    res.json(polls)
});

app.post('/mylocation', function(req, res){
    if( !req.body.hasOwnProperty('id')   ||
        !req.body.hasOwnProperty('poll') ||
        !req.body.hasOwnProperty('latitude') ||
        !req.body.hasOwnProperty('longitude')
    ){
        res.statusCode = 400;
        return res.send('Error: Missing parameters');
    }
    var poll = req.body.poll;
    var id = req.body.id;
    if(!(poll in polls)){
        polls[poll] = {}
    }
    if(!(id in polls[poll])){
        polls[poll][id] = {}
    }
    polls[poll][id]['latitude'] = req.body.latitude;
    polls[poll][id]['longitude'] = req.body.longitude;

    res.json(true)
});

app.get('/getlocations/:poll', function(req, res){
    if(!(req.params.poll in polls)) {
        res.statusCode = 404;
        return res.send('Error: Poll does not exist');
    }
    res.json(polls[req.params.poll])
});

app.listen(process.env.PORT || 80);


