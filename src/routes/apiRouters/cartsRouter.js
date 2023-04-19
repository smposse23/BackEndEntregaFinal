import express from "express";
import * as CartsController from "../../controllers/cartController.js";
import { checkLogin, checkAdminRole } from "../../middlewares/permissions.js";

//router carritos
const cartsRouter = express.Router();

cartsRouter.get("/", CartsController.getCartsController);

cartsRouter.get("/userCart", checkLogin, CartsController.getUserCartController);

cartsRouter.delete(
  "/deleteMyCart",
  checkLogin,
  CartsController.deleteUserCartController
);

cartsRouter.get("/cartByUser", CartsController.getCartByUserController);

cartsRouter.get("/:id", CartsController.getOneCartController);

cartsRouter.post("/", checkLogin, CartsController.createCartController);

cartsRouter.delete(
  "/:id",
  checkAdminRole,
  CartsController.deleteCartController
);

cartsRouter.delete(
  "/",
  checkAdminRole,
  CartsController.deleteAllCartsController
);

cartsRouter.post(
  "/:id/productos",
  checkLogin,
  CartsController.addProductToCartController
);

cartsRouter.delete(
  "/:id/productos/:idProd",
  checkLogin,
  CartsController.deleteProdFormCartController
);

cartsRouter.post(
  "/enviarPedido",
  checkLogin,
  CartsController.checkoutController
);

export { cartsRouter };
