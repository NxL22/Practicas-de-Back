import { Router } from "express";
import userService from "../service/user.service.js";
import adminService from "../service/admin.service.js";
import { adminGuard, authenticateJWT, prueba } from "../middleware/middleware.js";
import { addWord } from "../middleware/middleware.js"
import UserRole from "../utils/enum/user-role.enum.js";


const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Operaciones relacionadas con las autorizaciones
 */

authRoutes.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body

        if (role == UserRole.Admin) {
            const result = await adminService.loginAdmin(email, password);
            return res.send(result);
        }
        const result = await userService.loginUser(email, password);
        return res.send(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
}
)




authRoutes.get("/me", authenticateJWT, async (req, res) => {
    try {
        return res.json(req.user)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})


authRoutes.get("/word", addWord, async (req, res) => {
    try {

        const middlewareResult = req.meta

        // res.send(`hola ${result}, este es tu middleware ${middlewareResult}`);
        const chart = `hola , este es tu middleware ${middlewareResult}`
        const allCombinations = {
            chart,
            middlewareResult
        }
        res.status(200).json(allCombinations)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})


export default authRoutes;