import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  //propiedades del usuario que vamos a guardar en la base de datos
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  fotoUrl: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
  },
});

export const UserModel = mongoose.model(usersCollection, userSchema);
