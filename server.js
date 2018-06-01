const express = require('express');
const hbs = require('hbs');


const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));

// Current year helper
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

// bada karne waala helper
hbs.registerHelper('iskoBadaKar', (text) => {
	if (text) {
		return text.toUpperCase()
	}
	return ''
});

// using middle wares
app.use((request, response, next) => {
	var currentTime = new Date().toString()
	console.log(`${currentTime}: ${request.method} => ${request.url}`)
	next();
});

// maintanence middle ware
app.use((request, response, next) => {
	response.render('maintanence.hbs')
});

app.get('/', (request, response) => {
	response.render("home.hbs", {
		shit_type : "Maha",
		current_year : new Date().getFullYear(),
		page_title : "Home Page Suckers",
		data : {
			andar : "hahahah",
			nacho : "again"
		}
	});
});

app.get('/about', (request, response) => {
	response.render("about.hbs", {
		shit_type : "Utter",
		current_year : new Date().getFullYear(),
		page_title : "This is About Page"
	});
});

app.get('/bad', (request, response) => {
	response.statusCode = 500;
	response.send({
		errorCode : 505,
		errorMessage : "Some Shitty Error has occured"
	});
});

app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`);
});
