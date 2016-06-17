var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/src', express.static(__dirname + '/src'));
app.use('/build', express.static(__dirname + '/build'));

var users = [];
app.post('/api/users/post',(req,res)=>{
	console.log(req.body);
	res.send({success:true,data:req.body});
	users.push(req.body);
});

app.get('/api/users',(req,res)=>{
	res.send(users);
});

app.use('/', function(req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(3000, function() {
	console.log('listening on *:3000');
}); 
