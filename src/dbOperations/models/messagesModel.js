import mongoose from "mongoose";

// creo la colección de mensajes
const messagesCollection = "messages";

// creo el schema de mensajes
const messagesSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// generar modelo, que nos permita realizar las operaciones sobre los documentos
export const MessagesModel = mongoose.model(messagesCollection, messagesSchema);
