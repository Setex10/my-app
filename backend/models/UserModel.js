const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const InventarioSchema = require("./InventarioModel.js");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true, // Evita correos duplicados en la base de datos
        lowercase: true, // Siempre lo guarda en minúsculas
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un correo válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    role: {
        type: String, 
        required: [true, "Debe de existir "]
    }
})

UserSchema.pre("save", async function(next){
    if (!this.isModified('password')) return next();

    try {
        // Generamos un 'salt' (un valor aleatorio para fortalecer el hash)
        const salt = await bcrypt.genSalt(10);
        // Hasheamos la contraseña
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.comparePassword = async function(passwordCandidata) {
    return await bcrypt.compare(passwordCandidata, this.password);
};

const UserModel = mongoose.model("User", UserSchema)


module.exports = UserModel
