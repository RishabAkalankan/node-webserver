const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((request, response, next)=> {
    var current = new Date().toString();
    var log = `${current}: ${request.method}, ${request.url}`;
    fs.appendFileSync('server_log.txt', log + '\n')
    console.log(log);
        next();
});

// app.use((request,response,next)=> {
//     response.render('maintenance.hbs', {
//         pageTitle: 'We are under maintenance',
//         maintenance: 'Sorry for the inconvenience caused'
//     })
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});
hbs.registerHelper('upperCase', (text)=> {
    return text.toUpperCase();
});
app.get('/',(request, response)=> {
    // response.send('<h1>Hello World</h1>');
    // response.send({
    //     name: 'Jason Roy',
    //     higest: {
    //         test: 134,
    //         odi: 154,
    //         tt: 95
    //     }  
    // });
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        motto: 'Where people satisfaction is first'
    })
});

app.get('/pricing', (request, response) => {
    // response.send('<h1>Pricing Page</h1>');
    response.render('pricing.hbs', {
        pageTitle: 'Pricing Page'
    });
});

app.get('/**', (request, response)=> {
    response.send({
        errorMessage: 'Unable to parse the request'
    });
});

app.listen(3000);