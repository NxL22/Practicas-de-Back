import { Router } from "express";
import userService from "../service/user.service.js";
import adminService from "../service/admin.service.js";
import { authenticateJWT } from "../middleware/middleware.js";
import { addWord } from "../middleware/middleware.js"
import UserRole from "../utils/enum/user-role.enum.js";

const authRoutes = Router();


authRoutes.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if(role==UserRole.Admin){
            const response = await adminService.loginAdmin({ email,password });
            return res.json(response)
        }
        const response = await userService.loginUser({ email,password });
        return res.json(response)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})


authRoutes.get("/me",authenticateJWT, async (req, res) => {
    try {
        return res.json(req.user.email)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Hubo un error en el servidor.');
    }
})


authRoutes.get("/word",addWord, async (req, res) => {
    try {
        
        const middlewareResult = req.meta

        // res.send(`hola ${result}, este es tu middleware ${middlewareResult}`);
        const chart=`hola , este es tu middleware ${middlewareResult}`
        const allCombinations ={
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