const express = require('express');
const app = express();

// quotes array with some pre-populated quotes about technology
// Each quote in the array has a person and quote property
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const arrayOfQuotesByPerson = quotes.filter(quoteObject => {
            return quoteObject.person === req.query.person;
        });
        res.send({
            quotes: arrayOfQuotesByPerson
        })
    } else {
        res.send({
            quotes: quotes
        });
    }
});

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ 
        quote: randomQuote
    });
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    const newQuoteObject = {
        quote: newQuote,
        person: newPerson
    };
    if (req.query.quote && req.query.person) {
        quotes.push(newQuoteObject);
        res.send({
            quote: newQuoteObject
        });
    } else {
        res.status(400).send();
    }
});