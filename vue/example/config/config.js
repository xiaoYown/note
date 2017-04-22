var port = 3000;

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
	port: port,
	pathUrl: 'http://192.168.0.108:' + port + '/',
	apiUrl: isPro ? 'http://192.168.0.108/api/tuxi' : 'http://192.168.0.108:' + port + '/api',
	api: 'http://192.168.0.108/api/tuxi'
}