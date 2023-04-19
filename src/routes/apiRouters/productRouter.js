import express from "express";
import * as ProductController from "../../controllers/productController.js";
import { checkAdminRole } from "../../middlewares/permissions.js";

// Product Router
const productsRouter = express.Router();

productsRouter.get("/", ProductController.getProductsController);

productsRouter.post(
  "/",
  checkAdminRole,
  ProductController.addProductController
);

productsRouter.get("/:id", ProductController.getOneProductController);

productsRouter.put(
  "/:id",
  checkAdminRole,
  ProductController.updateProductController
);

productsRouter.delete(
  "/:id",
  checkAdminRole,
  ProductController.deleteOneProductController
);

productsRouter.delete(
  "/",
  checkAdminRole,
  ProductController.deleteAllProductsController
);

export { productsRouter };
