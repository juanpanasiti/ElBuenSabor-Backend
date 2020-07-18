const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    default: "",
  },
  apellido: {
    type: String,
    default: "",
  },
  fechaNacimiento: {
    type: Date,
    default: "",
  },
  telefono: {
    type: Number,
    default: "",
  },
  borrado: {
    type: Boolean,
    default: false,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
    },
  ],
  domicilios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domicilio",
    },
  ],
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
