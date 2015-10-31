var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express()

mongoose.connect('mongodb://localhost/CONSUMOLUZ', function(err, res) {
if(err) throw err;
console.log('Connected to Database');
});

app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	 });

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'www')));

var consumoModelo=require("./models/consumo.js")(app,mongoose);

var conexionBD = require('./conexionBD.js')

var router=express.Router();
app.use(router);

router.route('/add')
.post(conexionBD.add);

router.route('/listar')
.get(conexionBD.viewAll);

router.route('/listarAno')
.get(conexionBD.getYearList)

router.route('/getAnos')
.post(conexionBD.getSelectedYears)

/*
app.post('/add',function(req, res){
	console.log(req.body)
	for (var item in req.body)
		console.log(req.body[item])
	
	res.status(200)
	res.header("location: index.html");
	res.redirect('/');
	//res.send('Recibido: ' + JSON.stringify(req.body))
})*/


app.listen(process.argv[2])