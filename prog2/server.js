'use strict';

//HTTPS
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/ssl/private/server_key.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/private/server_cert.cer', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const NodeCouchDb = require('node-couchdb');
const path = require('path');
const { check, validationResult } = require('express-validator/check');

// Global Vars
app.use(function(req, res, next){
		res.locals.errors = null;
		next();
		});

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(methodOverride(function (req, res) {
			if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			var method = req.body._method
			delete req.body._method
			return method
			}
			}))

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//LOGS
var morgan = require('morgan');
app.use(morgan('combined'));
var winston = require('./config/winston');
app.use(morgan('combined', { stream: winston.stream }));

// Connect to CouchDB on VM
const couchExternal = new NodeCouchDb({
    host: '10.92.128.29',
    port: 5984, 
    auth: {
	   user: 'admin',
           password: 'p@ssw0rd'
          }
});

// List all databases to console to test connectivity
couchExternal.listDatabases().then(function(dbs){
	console.log(dbs);
});

//database name
const dbName = 'restaurants';
//all is the name of the MapReduce views
const viewUrl =  '_design/docs/_view/all';

//WEB ROUTES
//INDEX root website/SHOW
app.get('/', function(req, res){
couchExternal.get(dbName, viewUrl).then(
function(data, headers, status){
res.render('index', {
restaurants:data.data.rows
});
},
function(err){
res.send(err);
});
});

//STORE Restaurant
app.post('/restaurant/add', function(req, res){
	const name = req.body.name;
	const food_type = req.body.food_type;
	const phonenumber = req.body.phonenumber;
	const website = req.body.website;
	//res.send(name);
	couchExternal.uniqid().then(function(ids){
		const id = ids[0];

		couchExternal.insert(dbName, {
			_id: id,
			name: name,
			food_type: food_type,
			phonenumber: phonenumber,
			website: website
		}).then( function(data, headers, status) {
			res.redirect('/');
		},
		function(err) {
			res.send(err);
		});
	});
});


//EDIT Restaurant
app.get('/restaurant/edit/:id', function(req, res){
	couchExternal.get(dbName, req.params.id).then(
	function(data, headers, status){
	res.render('edit', {
		restaurant:data.data.rows
	});
	},
	function(err){
	res.send(err);
	});
	});

//UPDATE Restaurant
app.post('/restaurant/update', function(req, res){
	const name = req.body.name;
	const food_type = req.body.food_type;
	const phonenumber = req.body.phonenumber;
	const website = req.body.website;
	//res.send(name);
	//couchExternal.uniqid().then(function(ids){
	//	const id = ids[0];

		couchExternal.insert(dbName, {
			_id: req.params._id,
			_rev: req.body._rev,
			name: name,
			food_type: food_type,
			phonenumber: phonenumber,
			website: website
		}).then( function(data, headers, status) {
			res.redirect('/');
		},
		function(err) {
			res.send(err);
		});
	});
//DESTROY Restaurant
app.delete('/restaurant/delete/:id', function(req,res){
	couchExternal.del(dbName, req.params.id, req.body.rev).then(
		function(data, headers,status){
		res.redirect('/');
	}, function(err){
		res.send(err);
		console.log(err)
	});
});
//HTTPS Server
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
console.log('Running on port 8443...');
