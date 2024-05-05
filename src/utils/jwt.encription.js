import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();



const secretKey = process.env.JWT_SECRET_KEY;

class EncriptionFunc {
    
    generateToken(user) {
        try {
            const payload = { userId: user.id, email: user.email, role: user.role };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h', algorithm: 'HS256' });
            return token;
        } catch (error) {
            throw new Error('Error al generar el token: ' + error.message);
        }
    }
    
// {
// userId:1,
// email:'neil@gmail.com'
// role:user,
// }
// {
// asjkdajksdhkahjksd-sdkkalsjkdaghsd-.ajsldkajksdlkajkl,
// }
    prueba(user){
        const payload = { userId: user.id, email: user.email, role: user.role }
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h', algorithm: 'HS256' } )
        return token
    }



}
// GET ALL PRODUCTS


export default new EncriptionFunc();
