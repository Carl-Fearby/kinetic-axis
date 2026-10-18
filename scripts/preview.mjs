/** Zero-dependency local preview of the exported Next.js site, including clean aliases. */
import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../out');
if(!fs.existsSync(root)){console.error('Run npm run build first.');process.exit(1)}
const port=Number(process.env.PORT||4300);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.vtt':'text/vtt; charset=utf-8','.woff2':'font/woff2'};
http.createServer((request,response)=>{
  let uri;
  try {uri=decodeURIComponent(new URL(request.url||'/',`http://localhost:${port}`).pathname)}
  catch {response.writeHead(400).end('Bad request');return}
  if(uri.includes('\0') || uri.split('/').includes('..')){response.writeHead(403).end('Forbidden');return}
  if(uri==='/index.html' || (uri.endsWith('.html') && uri!=='/404.html')) {
    const clean=uri==='/index.html'?'/' : uri.slice(0,-5);
    const search=new URL(request.url||'/',`http://localhost:${port}`).search;
    response.writeHead(301,{Location:clean+search}).end();return;
  }
  const name=uri==='/'?'/index.html':uri;
  let file=path.resolve(root,'.'+name);
  if(!file.startsWith(root+path.sep)){response.writeHead(403).end('Forbidden');return}
  // Next's export emits a directory beside each page (out/news/ holds RSC flight
  // data while out/news.html is the page). When the bare path is a directory,
  // the page lives in the sibling .html file, so prefer that before appending.
  const stat=file=>{try{return fs.statSync(file)}catch{return null}};
  const asFile=stat(file);
  if(asFile && asFile.isDirectory() && stat(file+'.html')?.isFile())file+='.html';
  else if(!asFile && !path.extname(file) && stat(file+'.html')?.isFile())file+='.html';
  if(fs.existsSync(file) && fs.statSync(file).isFile()){
    response.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    fs.createReadStream(file).pipe(response);return;
  }
  response.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
  if(fs.existsSync(path.join(root,'404.html')))fs.createReadStream(path.join(root,'404.html')).pipe(response);
  else response.end('404 — Not found');
}).listen(port,()=>console.log(`Static preview: http://localhost:${port}`));
