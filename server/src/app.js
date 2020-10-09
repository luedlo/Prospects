// Requires
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(cors())

// Mongoose
const mongoose = require('mongoose')
const uri = "mongodb+srv://LELV:81997912@cluster0.qljii.mongodb.net/ProspectsDB?retryWrites=true&w=majority"
mongoose.connect(uri)
const db = mongoose.connection;
db.on('error', console.error.bind(console, "\n\n\x1b[36m Error in Connection to MongoDB:\x1b[0m\n\n"))
db.once('open', (callback) => {
  console.log("\n\n\x1b[36m Connection Succeeded! \x1b[0m\n\n")
})

// ENV
app.listen(process.env.PORT || 8081)


////////////////////////////////////////////////
//////////////////// Models ////////////////////
////////////////////////////////////////////////
const Prospect = require('../models/prospect')


////////////////////////////////////////////////
/////////////////// Requests ///////////////////
////////////////////////////////////////////////


///////////////////// Prospect /////////////////////
// Create
app.post('/prospect/create', async (req, res) => {
  const db = req.db

  const firstname = req.body.firstname
  const lastname1 = req.body.lastname1
  const lastname2 = req.body.lastname2
  const street = req.body.street
  const housenumber = req.body.housenumber
  const suburb = req.body.suburb
  const postalcode = req.body.postalcode
  const phone = req.body.phone
  const RFC = req.body.RFC
  const docs = req.body.docs

  const new_prospect = new Prospect({
    firstname: firstname,
    lastname1: lastname1,
    lastname2: lastname2,
    street: street,
    housenumber: housenumber,
    suburb: suburb,
    postalcode: postalcode,
    phone: phone,
    RFC: RFC,
    docs: docs,
    status: 1,
    observations: ''
  })

  await new_prospect.save((error) => {
    if (error) {
      console.log(error);
      res.send({
        success: false,
        message: `Ha ocurrido algo: ${error}`
      })
    }
        
    res.send({
      success: true,
      message: 'Prospecto guardado exitosamente!'
    })
  })
})

// Read All
app.get('/prospects', async (req, res) => {
  await Prospect.find({}, 'firstname lastname1 lastname2 status', (error, prospects) => {
    if (error) {
      console.log(error);
      res.send({
        success: false,
        message: `Ha ocurrido algo: ${error}`
      })
    }

    res.send({
        prospects: prospects
    })
  }).sort({ _id: -1 })
})

// Read One
app.get('/prospect/:id', (req, res) => {
  const db = req.db;
  Prospect.findById(req.params.id, 'firstname lastname1 lastname2 street housenumber suburb postalcode phone RFC docs status observations', (error, prospect) => {
    if (error) {
      console.log(error);
      res.send({
        success: false,
        message: `Ha ocurrido algo: ${error}`
      })
    }

    res.send(prospect)
  })
})

// Update
app.put('/prospect/update/:id', async (req, res) => {
  const db = req.db;
  
  await Prospect.findById(req.params.id, 'firstname lastname1 lastname2 street housenumber suburb postalcode phone RFC docs status observations', (error, prospect) => {
    if (error) {
      console.log(error);
      res.send({
        success: false,
        message: `Ha ocurrido algo: ${error}`
      })
    }

    prospect.firstname = req.body.firstname
    prospect.lastname1 = req.body.lastname1
    prospect.lastname2 = req.body.lastname2
    prospect.street = req.body.street
    prospect.housenumber = req.body.housenumber
    prospect.suburb = req.body.suburb
    prospect.postalcode = req.body.postalcode
    prospect.phone = req.body.phone
    prospect.RFC = req.body.RFC
    prospect.docs = req.body.docs
    prospect.status = req.body.status
    prospect.observations = req.body.observations

    prospect.save((error) => {
      if (error) {
        console.log(error);
        res.send({
          success: false,
          message: `Ha ocurrido algo: ${error}`
        })
      }

      res.send({
        success: true
      })
    })
  })
})

// Delete
app.delete('/prospect/delete/:id', async (req, res) => {
  const db = req.db;
  await Prospect.remove({ _id: req.params.id }, (error, prospect) => {
    if (error) {
      console.log(error);
      res.send({
        success: false,
        message: `Ha ocurrido algo: ${error}`
      })
    }

    res.send({
      success: true,
      prospect: prospect
    })
  })
})