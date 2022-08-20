
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


function dateIsValid(date) {

  if(new Date(date) != 'Invalid Date') {
    return true;
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if(regex.test(date)) {
    const dateObject = new Date(date);
    if(Number.isNaN(dateObject.getTime())) {
      return false;
    } else {
      return true;
    }
  } else {
    return !Number.isNaN(Number(date));
  }
}

app.get("/api/", (req, res)=>{
  res.json({"unix": Date.now(), "utc": new Date(Date.now()).toUTCString()});
});

app.get("/api/:date",(req, res) => {
  const input = req.params.date;
  if(!dateIsValid(input)) {
    res.json({ error : "Invalid Date" });
  }

  /*if(input == '') {
    res.json({"unix": Date.now(), "utc": new Date(Date.now()).toUTCString()});
  }*/
   
  res.json({"unix": Number.isNaN(Number(input)) ? new Date(input).getTime() : Number(input), "utc": Number.isNaN(Number(input)) ? new Date(input).toUTCString() : new Date(Number(input)).toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
