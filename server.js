import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import cluster from "cluster";
import os from "os";
import { logger } from "./src/logger.js";
import { apiRouter } from "./src/routes/indexRouter.js";
import { objArguments } from "./src/config/options.js";

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//trabajar con archivos estaticos de public
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));

// configurando almacenamiento de sessions en Mongo Atlas
app.use(cookieParser());

app.use(
  session({
    //definimos el session store
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    secret: process.env.MONGO_SESSIONS_CLAVE,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

//configurar passport
app.use(passport.initialize()); //conectamos a passport con express.
app.use(passport.session()); //vinculacion entre passport y las sesiones de nuestros usuarios.

const PORT = process.env.PORT || objArguments.PORT;
const MODO = process.env.MODE || objArguments.MODE;
const ENV = process.env.NODE_ENV;

// lógica Modos Fork y Cluster
if (MODO == "CLUSTER" && cluster.isPrimary) {
  // si el modo el CLUSTER y si el cluster pertenece al proceso principal
  // creamos los subprocesos que van a pertenecer a ese modo cluster
  const numCpus = os.cpus().length; // número de núcleos del procesador
  for (let i = 0; i < numCpus; i++) {
    cluster.fork(); // crea los subprocesos
  }
  cluster.on("exit", (worker) => {
    logger.info(`El subproceso ${worker.process.pid} dejó de funcionar`);
    cluster.fork();
  });
} else {
  //servidor de express
  const server = app.listen(PORT, () =>
    logger.info(
      `listening on port ${PORT} on process ${process.pid} in env ${ENV} with mode ${MODO}`
    )
  );
}

//api routes
app.use("/api", apiRouter);

export { app };
