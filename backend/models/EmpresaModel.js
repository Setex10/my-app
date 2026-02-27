const mongoose = require("mongoose")

const EmpresaSchema = mongoose.Schema({
  nombre: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
})

const EmpresaModel = mongoose.model("Empresa", EmpresaSchema)
module.exports = EmpresaModel