const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url);
  console.log('Solicitud recibida para:', filePath);

  if (filePath === __dirname + '/') {
    filePath = path.join(__dirname, 'index.html');
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    default:
      contentType = 'application/octet-stream';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('Archivo no encontrado:', filePath);
        res.statusCode = 404;
        res.end('404 Not Found');
      } else {
        console.log('Error de lectura del archivo:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    } else {
      console.log('Archivo servido:', filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor web en ejecución en el puerto ${port}`);
});
