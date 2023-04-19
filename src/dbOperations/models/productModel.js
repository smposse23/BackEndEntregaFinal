import mongoose from "mongoose";

// creo la colección de productos
const productCollection = "productos";

// creo el schema de productos
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

// generar modelo, que nos permita realizar las operaciones sobre los documentos
export const ProductModel = mongoose.model(productCollection, productSchema);
