import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = process.argv[2] || '.';
const port = Number(process.argv[3] || process.env.PORT || 5173);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
]);

const server = createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);
  const safePath = normalize(decodeURIComponent(url.pathname)).replace(/^\.{2,}/, '');
  let filePath = join(root, safePath === '/' ? 'index.html' : safePath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, 'index.html');
  }

  response.setHeader('Content-Type', types.get(extname(filePath)) || 'application/octet-stream');
  createReadStream(filePath)
    .on('error', () => {
      response.statusCode = 404;
      response.end('Not found');
    })
    .pipe(response);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
