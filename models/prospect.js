const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProspectSchema = new Schema({
    firstname: String,
    lastname1: String,
    lastname2: String,
    street: String,
    housenumber: String,
    suburb: String,
    postalcode: String,
    phone: String,
    RFC: String,
    docs: Array,
    status: String,
    observations: String
})

const Prospect = mongoose.model('Prospect', ProspectSchema)
module.exports = Prospect