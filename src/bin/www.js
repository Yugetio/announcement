const http = require('http');
const app = require('../app');
const assertDatabaseConnection = require('../dbconf');

const server = http.createServer(app);

const PORT = process.env.PORT || '3000';
app.set('port', PORT);

async function init() {
	await assertDatabaseConnection();

	console.log(`Starting Sequelize + Express on port ${PORT}...`);

	server.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}.`);
	});
}

init();