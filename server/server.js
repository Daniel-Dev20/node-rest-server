
require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4040;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json('Hola Mundo');
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    res.json({
        id
    })
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    res.send('get usuario')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones en el puerto',process.env.PORT);
})