import express, { request, response } from 'express';

const app:express.Application = express();

app.get('/',(request,response)=>{
  response.send('hello world!');
});

app.listen(4000);