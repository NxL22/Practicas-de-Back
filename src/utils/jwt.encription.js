import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();



const secretKey = process.env.JWT_SECRET_KEY;

class EncriptionFunc {

    generateToken(user) {

        const payload = { userId: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h', algorithm: 'HS256' });
        return token;
    }



}
// GET ALL PRODUCTS


export default new EncriptionFunc();
