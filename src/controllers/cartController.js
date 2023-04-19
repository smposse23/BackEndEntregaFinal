import { logger } from "../logger.js";
import {
  getCarts,
  getCartByUserId,
  addCart,
  deleteCart,
  deleteAllCarts,
  getOneCart,
  updateCart,
} from "../services/cartServices.js";
import { getOneProduct } from "../services/productServices.js";
import { transporterEmail, mailAdmin } from "../messages/email.js";

export const getCartsController = async (req, res) => {
  try {
    const response = await getCarts();
    res.status(200).json({ Carritos: response });
  } catch (error) {
    logger.error(`Error al cargar los carritos ${error}`);
    res.status(400).json({ message: `Error al cargar los carritos ${error}` });
  }
};

export const getOneCartController = async (req, res) => {
  try {
    const cart = await getOneCart(req.params.id);
    res.status(200).json({ Cart: cart });
  } catch (error) {
    logger.error(`Error al buscar el carrito ${error}`);
    res.status(400).json({ message: `Error al buscar el carrito ${error}` });
  }
};

export const getCartByUserController = async (req, res) => {
  try {
    const cart = await getCartByUserId(req.body.id);
    res.status(200).json({ Cart: cart });
  } catch (error) {
    logger.error(`Error al buscar el carrito ${error}`);
    res.status(400).json({ message: `Error al buscar el carrito ${error}` });
  }
};

export const getUserCartController = async (req, res) => {
  try {
    const cart = await getCartByUserId(req.user.id);
    res.status(200).json({ Cart: cart });
  } catch (error) {
    logger.error(`Error al buscar el carrito ${error}`);
    res.status(400).json({ message: `Error al buscar el carrito ${error}` });
  }
};

export const deleteUserCartController = async (req, res) => {
  try {
    const cart = await getCartByUserId(req.user.id);
    const response = await deleteCart(cart[0]._id);
    res.status(200).json({ DeletedCart: response });
  } catch (error) {
    logger.error(`Error al borrar el carrito${error}`);
    res.status(400).json({ message: `Error al borrar el carrito${error}` });
  }
};

export const createCartController = async (req, res) => {
  try {
    const clientCart = await getCartByUserId(req.user.id);
    if (!clientCart[0]) {
      const response = await addCart({
        products: req.body,
        userId: req.user.id,
      });
      res.status(200).json({ NewCarritos: response });
    } else {
      res.status(200).json({
        message: `Este usuario ya posee un carrito existente. Para poder crear otro primero finalice la compra o borre el carrito actual.`,
      });
    }
  } catch (error) {
    logger.error(`Error al crear nuevo carrito${error}`);
    res.status(400).json({ message: `Error al crear nuevo carrito${error}` });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const response = await deleteCart(req.params.id);
    res.status(200).json({ DeletedCart: response });
  } catch (error) {
    logger.error(`Error al borrar el carrito${error}`);
    res.status(400).json({ message: `Error al borrar el carrito${error}` });
  }
};

export const deleteAllCartsController = async (req, res) => {
  try {
    const response = await deleteAllCarts();
    res.status(200).json({ message: response });
    res.send(`Carritos eliminados: ${response}`);
  } catch (error) {
    logger.error(`Error al eliminar todos los carritos ${error}`);
    res.status(400).json({ message: `Hubo un error ${error}` });
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const cartId = req.params.id;
    const productId = req.body.id;
    const carritoResponse = await getOneCart(cartId);
    if (carritoResponse.error) {
      res.json({ message: `El carrito con id: ${cartId} no fue encontrado` });
    } else {
      const productoResponse = await getOneProduct(productId);
      if (productoResponse.error) {
        res.json(productoResponse);
      } else {
        carritoResponse.products.push(productoResponse);
        const response = await updateCart(carritoResponse, cartId);
        res.json({ message: "product added" });
      }
    }
  } catch (error) {
    logger.error(`Error al guardar producto en el carrito ${error}`);
    res.send(`No se pudo guardar el producto en el carrito`);
  }
};

export const deleteProdFormCartController = async (req, res) => {
  try {
    const cartId = req.params.id;
    const productId = req.params.idProd;
    const carritoResponse = await getOneCart(cartId);
    if (carritoResponse.error) {
      res.json({ message: `El carrito con id: ${cartId} no fue encontrado` });
    } else {
      const index = carritoResponse.products.findIndex(
        (p) => p._id === productId
      );
      if (index !== -1) {
        carritoResponse.products.splice(index, 1);
        await updateCart(carritoResponse, cartId);
        res.json({ message: "product deleted" });
      } else {
        res.json({
          message: `El producto no se encontro en el carrito: ${cartId}`,
        });
      }
    }
  } catch (error) {
    logger.error(`Error al eliminar el producto ${error}`);
    res.send(`El producto no se encontro en el carrito: ${cartId}`);
  }
};

export const checkoutController = async (req, res) => {
  try {
    const clientCart = await getCartByUserId(req.user.id);
    const emailTemplate = `<div>
          <h1>Pedido enviado</h1>
          <h3>Productos: ${clientCart[0].products}</h3>
      </div>`;

    const mailOptions = {
      from: "Servidor de NodeJs",
      to: mailAdmin,
      subject: `Nuevo Pedido de ${req.user.nombre} ${req.user.email}`,
      html: emailTemplate,
    };
    transporterEmail.sendMail(mailOptions);
    const cartId = await getCartByUserId(req.user.id);
    await deleteCart(cartId[0]);
    res.json("El pedido ha sido enviado y el carrito borrado");
  } catch (error) {
    logger.error(`Error al enviar el pedido${error}`);
    res.send(`Error al enviar el pedido${error}`);
  }
};

//const export checkoutByCartIdController =
