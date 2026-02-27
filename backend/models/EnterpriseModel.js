const mongoose = require("mongoose")

const EnterpriseSchema = mongoose.Schema({
  name: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})

const EnterpriseModel = mongoose.model("Empresa", EnterpriseSchema)
module.exports = EnterpriseModel