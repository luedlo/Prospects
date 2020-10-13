// Requires
const cors = require('cors')
const morgan = require('morgan')
const cluster = require('cluster')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const publicDir = require('path').join(__dirname, './../public')
const app = express()
const PORT = 8081
const HOST = '0.0.0.0'

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json({ limit: '10.1mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

// Cluster
if (cluster.isMaster) {
  const CPUs = require('os').cpus().length
  console.log(`Master ${process.pid} runing`)
  for (let i = 0; i < CPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`\x1b[36m Worker ${worker.process.pid} died! \x1b[0m\n`)
    cluster.fork()
  })
} else {
  cluster.on('exit',() => {
    cluster.fork();
  });

  process.on('error', (error) => {
      console.log(error.stack);
  });
  
  // Mongoose
  const uri = "mongodb+srv://LELV:81997912@cluster0.qljii.mongodb.net/ProspectsDB?retryWrites=true&w=majority"
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, "\n\n\x1b[36m Error in Connection to MongoDB:\x1b[0m\n\n"))
  db.once('open', (callback) => {
    console.log("\x1b[36m Connection Succeeded! \x1b[0m\n")
  })

  // ENV
  app.listen(process.env.PORT || PORT, HOST)
  console.log(`\x1b[36m Running on http://${HOST}:${PORT} \x1b[0m\n`);
  console.log('\x1b[36m Worker %d running! \x1b[0m\n', cluster.worker.id);
}

////////////////////////////////////////////////
//////////////////// Models ////////////////////
////////////////////////////////////////////////
const Prospect = require('../models/prospect')

////////////////////////////////////////////////
/////////////////// Requests ///////////////////
////////////////////////////////////////////////

app.get('/', (req, res) => {  
  res.sendFile(require('path').join(__dirname, './../public/index.html'))
}); 

/////////////////// Prospect ///////////////////
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
      console.log(error)
      res.send({
        success: false,
        message: `${error}`
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
      console.log(error)
      res.send({
        success: false,
        message: `${error}`
      })
    }

    res.send({
        prospects: prospects
    })
  }).sort({ _id: -1 })
})

// Read One
app.get('/prospect/:id', (req, res) => {
  const db = req.db
  Prospect.findById(req.params.id, 'firstname lastname1 lastname2 street housenumber suburb postalcode phone RFC docs status observations', (error, prospect) => {
    if (error) {
      console.log(error)
      res.send({
        success: false,
        message: `${error}`
      })
    }

    res.send({
      success: true,
      prospect: prospect
    })
  })
})

// Update
app.put('/prospect/update/:id', async (req, res) => {
  const db = req.db
  
  await Prospect.findById(req.params.id, 'status observations', (error, prospect) => {
    if (error) {
      console.log(error)
      res.send({
        success: false,
        message: `${error}`
      })
    }

    prospect.status = req.body.status
    prospect.observations = req.body.observations

    prospect.save((error) => {
      if (error) {
        console.log(error)
        res.send({
          success: false,
          message: `${error}`
        })
      }

      res.send({
        success: true,
        message: 'Prospecto evaluado exitosamente!'
      })
    })
  })
})

// Delete
app.delete('/prospect/delete/:id', async (req, res) => {
  const db = req.db
  await Prospect.remove({ _id: req.params.id }, (error, prospect) => {
    if (error) {
      console.log(error)
      res.send({
        success: false,
        message: `${error}`
      })
    }

    res.send({
      success: true,
      prospect: prospect
    })
  })
})

app.use(history())
 app.use(express.static(publicDir));