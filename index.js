"use strict"
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var fs = require("fs");

app.use(bodyParser());

app.get('/', function (req, res) {
	res.send("");
});

app.post("/add", function (req, res) {
	console.log(req.body);
	fs.readFile("./public/json/record.json", function (err, data) {
		if (!err) {
			console.log(data + "");
			var record = JSON.parse("" + data);
			record.list.push(req.body);
			fs.writeFile("./public/json/record.json", JSON.stringify(record), function (err) {
				if (err) {
					console.log(err);
				}
			})
		}
	})
	res.send(req.body);
});

app.post("/delete", function (req, res) {
	console.log(req.body);
	fs.readFile("./public/json/record.json", function (err, data) {
		if (!err) {
			console.log(data + "");
			var record = JSON.parse("" + data);
			record.list.splice(req.body.id, 1);
			fs.writeFile("./public/json/record.json", JSON.stringify(record), function (err) {
				if (err) {
					console.log(err);
				}
			})
		}
	})
	res.send(req.body);
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {
	var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
