const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { Client } = require('pg');

// instantiate client using your DB configurations
const client = new Client({
	database: 'MyDatabase',
	user: 'postgres',
	password: 'kimkim669977',
	host: 'localhost',
	port: 5432
});

client.connect()
	.then(function(){
		console.log('Connected  to database!')
	})
	.catch(function(err){
		console.log('Cannot connect to database')
	});



const app = express();
// tell express which folder is a static/public folder
app.set('views', path.join(__dirname,'views'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.set('port',(process.env.PORT|| 3000));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static1')));


app.get('/', function(req, res) {
	res.render('home',{
		content: 'This is some content',
		published: false
	});
});

app.get('/member/20/carlo',function(req,res) {
	res.render('member', {
		name: "Carlo",
		full_name: "Carlo S. Punzalan",
		email: "carlo10punzalan@gmail.com",
		phone: '09976897678',
		imgUrl: 'https://scontent.fmnl5-1.fna.fbcdn.net/v/t1.0-9/26230307_1764636126921718_980775150271982874_n.jpg?_nc_cat=0&oh=be0c2daacb89eb7a97402ed8bdb992dd&oe=5BDC21F7',
		hobbies: ['Playing games', 'Sleeping']
	})
});

app.get('/member/20/kim',function(req,res) {
	res.render('member', {
		name: "Kim",
		full_name: "Kim Leslie B. Faina",
		email: "kimlesliefaina.klf@gmail.com",
		phone: '09169783384',
		imgUrl: 'https://scontent.fmnl5-1.fna.fbcdn.net/v/t1.0-9/26733793_1791857060834034_1117507301938314770_n.jpg?_nc_cat=0&oh=6840260fe0d0804f3313fc5f741b599a&oe=5BD61F90',
		hobbies: ['Reading Novels', 'Watching Random Videos']
	})
});

//Server
app.listen(app.get('port'), function() {
	console.log('Server started at port 3000');
});