const express = require('express');
const	bodyParser = require('body-parser');
let shepherd = require('./routes/shepherd');
let app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	next();
});

app.use(bodyParser.json({ limit: '1mb' })); // support json encoded bodies
app.use(bodyParser.urlencoded({
	limit: '1mb',
	extended: true,
})); // support encoded bodies

app.get('/', (req, res) => {
	res.send('Electrum Proxy Server');
});

app.use('/api', shepherd);

let config = {};
process.argv.forEach((val, index) => {
	if (val.indexOf('ip=') > -1) {
		config.ip = val.replace('ip=', '');
	} else if (val.indexOf('port=') > -1) {
		config.port = val.replace('port=', '');
	}
});

const server = require('http')
                .createServer(app)
                .listen(config.port, config.ip);

console.log(`Electrum Proxy Server is running at ${config.ip}:${config.port}`);