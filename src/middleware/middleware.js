// import passport from "passport";
// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import dotenv from "dotenv";
// import UserEntity from "../entity/user.entity.js";
// dotenv.config();

// const secretKey = process.env.JWT_SECRET_KEY;

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: secretKey,
// };


// passport.use(
//     new JwtStrategy(opts, async (jwtPayload, done) => {
//         try {
//             console.log(jwtPayload);
//             const user = await UserEntity.findOne({ where: { email: jwtPayload.email } });

//             if (!user) {
//                 return done({menssage:'user not found'}, false);
//             }

//             return done(null, user);
//         } catch (error) {

//             return done(error, false);
//         }
//     })
// );

// export const authenticateJWT = passport.authenticate("jwt", { session: false });


import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserEntity from "../entity/user.entity.js";
import { response } from "express";
import UserRole from "../utils/enum/user-role.enum.js";
import AdminEntity from "../entity/admin.entity.js";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;


export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Token no encontrado" })

        try {
            const decoded = jwt.verify(token, secretKey);

            if (decoded.role === UserRole.Admin) {
                const admin = await AdminEntity.findOne({ where: { email: decoded.email } });

                if (!admin) {
                    return res.status(401).json({ message: "Usuario administrador no encontrado" });
                }

                req.user = admin;
            } else {
                const user = await UserEntity.findOne({ where: { email: decoded.email } });

                if (!user) {
                    return res.status(401).json({ message: "Usuario no encontrado" });
                }

                req.user = user;
            }

            next();
        } catch (error) {
            console.error("Error en la autenticación JWT:", error);
            return res.status(403).json({ message: "Token inválido" });
        }
    } else {
        res.status(401).json({ message: "Se requiere token de autenticación" });
    }
};

export const adminGuard = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(401).json({ message: "Acceso no autorizado" });
        }

        next();
    } catch (error) {
        console.error("Error en el middleware adminGuard:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};



// estoy tan perdido que estaba pensando en simplemente hacer un llamado como si fuera
// un ping al servidor, cuando eso no tiene ningun sentido.

// export const addWord = async (_req, res, next) => {
//     if (typeof res.body === 'string') {
//         res.body += " Mardetasea";
//     }
//     next()
// }



// Falle. esto es con chat gpt.
// export const addWord = async (req, res, next) => {
//     if (typeof res.send === 'function') {
//         const originalSend = res.send;
//         res.send = function(data) {
//             if (typeof data === 'string') {
//                 data += " Mardetasea";
//             }
//             originalSend.call(this, data);
//         };
//     }
//     next();
// };


export const addWord = async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No hay cuerpo en la solicitud" });
    }

    if (typeof req.body.nombre === "string") {
        req.meta = " Mardetasea";
    }

    next();
};
// Ni hablar intentar hacerlo en pasarselo por JSON.

