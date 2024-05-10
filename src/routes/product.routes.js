import { Router } from "express";
import productService from "../service/product.service.js";
import { adminGuard, authenticateJWT } from "../middleware/middleware.js";

const productRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operaciones relacionadas con las autorizaciones
 */

productRoutes.get("/hello", async (req, res) => {
    try {
        const { name, price, capacity, description } = req.body;
        const response = await productService.createProduct({ name, price, capacity, description });
        return res.json(response)

    } catch (error) {

        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }

})


productRoutes.post("/create", authenticateJWT, adminGuard, async (req, res) => {
    try {
        const userId  = req.user.id;
        const { name, price, capacity, description } = req.body;
        const response = await productService.createProduct({  name, price, capacity, description, userId });
        return res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})




export default productRoutes;


// Me gustaria que ferxxo me enseñe como hacer de una la prueba con la ruta
//por EJ como el console.log("Hello mundito")
