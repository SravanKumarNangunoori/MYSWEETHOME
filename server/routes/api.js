const express = require('express');
const router = express.Router();

var moment = require('moment');
// declare mongo db credentials for making http requests
const mongojs = require('mongojs');
const DarkSky = require('dark-sky');
const darksky = new DarkSky('3ed1252bfd6e34ca765f8f4ec4de243a');
const db = mongojs('mongodb://mysweethomeuser:mysweethomepassword1@ds231207.mlab.com:31207/mysweethome')
const users = db.users;
const houses = db.houses;
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});
// add user to fb
router.post('/adduser',(req,res)=>{
    users.insert(req.body,function(err, doc) {
             console.log(doc);
             console.log("Successfully Added")
             if (err) throw err;
             res.send(doc);
  });
  });

router.post('/weather', async (req, res, next) => {
  try {
    const latitude=req.body.params.updates[0].value;
    const longitude=req.body.params.updates[1].value;
    const forecast = await darksky
      .options({
        latitude,
        longitude,
        time: moment().subtract(1, 'weeks')
      })
      .get()
    res.status(200).json(forecast)
  } catch (err) {
    next(err)
  }});
// Get list of registered users
router.get('/registeredusers', (req, res) => {
    users.find(function(err, docs) {
          res.send(docs);
      }); 
  });
module.exports = router;
