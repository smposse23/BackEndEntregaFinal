// Fabrica
import { UserModel } from "./models/userModel.js";
import { CartModel } from "./models/cartModel.js";
import { MessagesModel } from "./models/messagesModel.js";
import { ProductModel } from "./models/productModel.js";
import { options } from "../config/options.js";
import { MyMongoClient } from "./clients/dbClientMongo.js";

export async function getApiDao(DBTYPE) {
  let CartDaoContainer;
  let MessagesDaoContainer;
  let ProductsDaoContainer;
  let UsersDaoContainer;

  switch (DBTYPE) {
    case "archivos":
      const { CartArchivosDao } = await import(
        "./daos/carts/cartArchivosDao.js"
      );
      const { MessagesArchivosDao } = await import(
        "./daos/messages/messagesArchivosDao.js"
      );
      const { ProductsArchivosDao } = await import(
        "./daos/products/productsArchivosDao.js"
      );
      const { UserArchivosDao } = await import(
        "./daos/users/userArchivosDao.js"
      );
      CartDaoContainer = new CartArchivosDao("carritos");
      MessagesDaoContainer = new MessagesArchivosDao("messages");
      ProductsDaoContainer = new ProductsArchivosDao("productos");
      UsersDaoContainer = new UserArchivosDao("usuarios");
      break;
    case "sql":
      const { CartSQLDao } = await import("./daos/carts/cartSqlDao.js");
      const { MessagesSQLDao } = await import(
        "./daos/messages/messagesSqlDao.js"
      );
      const { ProductosDaoSQL } = await import(
        "./daos/products/productsSqlDao.js"
      );
      const { UserSQLDao } = await import("./daos/users/userSqlDao.js");
      // Conectamos a la base de datos de MySql
      CartDaoContainer = new CartSQLDao(options.sqliteDb, "carritos");
      MessagesDaoContainer = new MessagesSQLDao(options.sqliteDb, "messages");
      ProductsDaoContainer = new ProductosDaoSQL(options.sqliteDb, "productos");
      UsersDaoContainer = new UserSQLDao(options.sqliteDb, "usuarios");
      break;
    case "mongo":
      const { CartMongoDao } = await import("./daos/carts/cartMongoDao.js");
      const { MessagesMongoDao } = await import(
        "./daos/messages/messagesMongoDao.js"
      );
      const { ProductsMongoDao } = await import(
        "./daos/products/productsMongoDao.js"
      );
      const { UserMongoDao } = await import("./daos/users/userMongoDao.js");
      // Conectamos a la base de datos de mongoDb
      const client = new MyMongoClient();
      await client.connect();
      CartDaoContainer = new CartMongoDao(CartModel);
      MessagesDaoContainer = new MessagesMongoDao(MessagesModel);
      ProductsDaoContainer = new ProductsMongoDao(ProductModel);
      UsersDaoContainer = new UserMongoDao(UserModel);
      break;
  }
  return {
    CartDaoContainer,
    MessagesDaoContainer,
    ProductsDaoContainer,
    UsersDaoContainer,
  };
}
