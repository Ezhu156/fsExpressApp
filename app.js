var fs = require('fs');
var data = fs.readFileSync('stats.json');
var data2 = fs.readFileSync('days.json');
var stats = JSON.parse(data);
var days = JSON.parse(data2);


console.log(stats);

console.log('server is starting');

var express = require('express');

var app = express();

var server = app.listen(3000,listening);

function listening(){
	console.log("server is running at port 3000");
}

app.use(express.static('website'));

app.get('/add/:day/:score?', update);

function update(req, res){
	var data = req.params;
	var day = data.day;
	var score = Number(data.score);

	stats[day] += score;
	var data3 = JSON.stringify(stats, null, 2);
	fs.writeFile('stats.json', data3, finished);

	for(var i = 0; i < score; i++){
		if (day == "Sunday"){
			days[day] += "🥞 ";
		} else if (day == "Monday"){
			days[day] += "💩";
		} else if (day == "Tuesday"){
			days[day] += "🌮";
		} else if (day == "Wednesday"){
			days[day] += "🐪";
		} else if (day == "Thursday"){
			days[day] += "✨";
		} else if (day == "Friday"){
			days[day] += "🦄";
		}else{
			days[day] += "🎉"
		}
		
	}
	var data4 = JSON.stringify(days, null, 2);
	fs.writeFile('days.json', data4, finished);

	function finished(err){
		console.log('all set');
	}


	res.send("This is how much people like " + day + " " + days[day]);
}


app.get('/stats', sendStats);

function sendStats(req, res){
	res.send(days);
}