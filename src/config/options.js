import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import ParsedArgs from "minimist";
// Minimist
const optionsMinimist = {
  default: { m: "FORK", e: "production" },
  alias: { p: "PORT", m: "MODE", e: "ENV" },
};
export const objArguments = ParsedArgs(process.argv.slice(2), optionsMinimist);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = objArguments.ENV;

dotenv.config({
  path: `.env.${NODE_ENV}`,
});

export const options = {
  server: {
    PORT: process.env.PORT,
    MODE: process.env.MODE,
    DBTYPE: process.env.DBTYPE || "mongo",
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  sqliteDb: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "../db/database.sqlite"),
    },
    useNullAsDefault: true,
  },

  /*mariaDb: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "desafiosql",
    },
  },
  fileSystem: {
    pathProducts: "Products.json",
    pathCarts: "Carritos.json",
    pathMessages: "Messages.json",
  },
  sqliteDb: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "../db/database.sqlite"),
    },
    useNullAsDefault: true,
  },*/
  /*firebase: {
    pathProducts: productCollection,
    pathCarts: cartCollection,
  },*/
};
