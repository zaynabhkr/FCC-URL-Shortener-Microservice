
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
// { original_url : 'https://freeCodeCamp.org', short_url : 1}



//we are using a database, is if we are going to reinit the server. 
//It will not remember the original and short database.

//We are going to keep it simple with array.

const originalUrls = [];
const shortUrls = [];

app.post('/api/shorturl', (req,res)=>{
  const url = req.body.url;
  

  const foundIndex = originalUrls.indexOf(url);
  
  if(!url.includes('https://') && !url.includes("http")){
    res.json({ error: 'invalid url' });
  }

  if (foundIndex < 0) {
    originalUrls.push(url);
    shortUrls.push(shortUrls.length);
 
  return res.json({
    original_url:url,
    short_url: shortUrls.length-1
  })
  }

  return res.json({
    original_url:url,
    short_url: shortUrls[foundIndex]
  })
});

//:shorturl is a placeholder for a dynamic value and can use it as variable inside middleware function with req.params.shorturl

app.get('/api/shorturl/:shorturl', function(req, res) {
 const shortUrl = parseInt(req.params.shorturl);
 const index = shortUrls.indexOf(shortUrl);
 
 if (index<0){
  return res.json({"error":"No short URL found for the given input"});
 }

 res.redirect(originalUrls[index]);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
