const http = require('http');
const app = require('../src/app');
const port = searchPort(process.env.PORT || '3000');
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Online server on port ${port}`);
});
server.on('error', onError);
server.on('listen', onListening);

function searchPort(portValue) {
  const port = parseInt(portValue, 10);
  if (isNaN(port)) return port;
  if (port > 0) return port;
  return false;
}

function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === 'string' ? `pipe ${addr}` : `${addr.family}:${addr.port}`;
  debug('Listening on' + bind);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'required elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + 'is already in user');
      process.exit(1);
    default:
      throw error;
  }
}
