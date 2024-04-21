import { Router } from "express";
import UserService from "../service/user.service.js";
import { dtoUserCreate } from "../dto/user.dto.js";
import { authenticateJWT } from "../middleware/middleware.js";


const userRoutes = Router();

userRoutes.post("/create", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //dtoUserCreate(, email, password);

        const newUser = await UserService.createUser({ name, email, password});

        return res.status(201).json(newUser);
    } catch (error) {
        // Capturar cualquier error y enviar una respuesta de error
        res.status(500).json({ error: error.message });
    }
});

userRoutes.get("/",authenticateJWT, async (_req, res) => {
    try {
        const users = await UserService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRoutes.get("/:id/id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRoutes.get("/email", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserService.getUserByEmail(email)
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



// userRoutes.put("/update/:id", async (req, res) => {
//     try {
//         const { name, email, password } = userData;
//         const user = await userService.updateUser(id, userData)
//         res.json(user)
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

userRoutes.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        dtoUserCreate(name, email, password);
        const { name, email, password } = userData;
        const user = await UserService.updateUser(id, { name, email, password })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// // Con chatgpt:
// userRoutes.put("/update/:id", async (req, res) => {
//     try {
//         const { id } = req.params; // Extraemos el id de los parámetros de la URL
//         const {name, email, password } = req.body; // Extraemos los datos del cuerpo de la solicitud
//         const userData = { name, email, password }; // Creamos un objeto userData con los datos

//         const user = await userService.updateUser(id, userData);
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


//este si lo hice solo
userRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.deleteUser(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRoutes.get("/idTwo", async (req, res) => {
    try {
        const user = await UserService.getTwoQuerysUsers(req.query);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

userRoutes.post("/hero", async (req, res) => {
    try {
        UserService.scope()
        res.json('user');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
//este si lo hice solo
//userRoutes.delete("/delete/:id", async (req, res) => {
//    try {
//        const { id } = req.params;
//        const user = await userService.deleteUser(id)
//        res.json(user)
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
//}
//este si lo hice solo
//userRoutes.delete("/delete/:id", async (req, res) => {
//    try {
//        const { id } = req.params;
//        const user = await userService.deleteUser(id)")
//})

export default userRoutes;

// Que ruta es mejor si por params o por body?