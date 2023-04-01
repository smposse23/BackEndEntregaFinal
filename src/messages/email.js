import { createTransport } from "nodemailer";

// Nodemailer - Credenciales del Admin

export const mailAdmin = "smposse23@gmail.com";
const passAdmin = "pmjfeamruzssnibp"; // Contraseña para conectar a Google: pmjfeamruzssnibp

// configuración del transporte de Nodemailer
export const transporterEmail = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: mailAdmin,
    pass: passAdmin,
  },
  // Propiedades para usar Postman
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});
