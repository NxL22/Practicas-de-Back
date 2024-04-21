import AdminEntity from "../entity/admin.entity.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import EncriptionFunc from "../utils/jwt.encription.js";
import UserRole from "../utils/enum/user-role.enum.js";
dotenv.config();

class AdminService {
    async createAdmin({ name, email, password, token }) {
        try {
            if (token !== process.env.TOKEN_ADMIN) {
                throw new Error('Token inválido');
            }
    
            const exists = await this.getAdmin();
            if (exists.length >= 1) {
                throw new Error('El administrador ya existe');
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            //CREACION APARTIR DE ORM
            const newAdmin = await AdminEntity.create({ name, email, password: hashedPassword ,role: UserRole.Admin});
            
            delete newAdmin.dataValues.password;
    
            return newAdmin;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async loginAdmin({email, password}) {
        try {
            const admin = await AdminEntity.findOne({ where: { email } });
            if (!admin) throw new Error("Faltan datos");
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) throw new Error("Faltan datos");
            const token =  EncriptionFunc.generateToken(admin);
            delete admin.dataValues.password;
            return { admin, token };
        } catch (error) {
            throw new Error("Error al buscar el usuario: " + error.message);
        }
    }

    async getAdmin(){
        try {
            //BUSQUEDA APARTIR DE ORM
            const admin = await AdminEntity.findAll();
            return admin;
        } catch (error) {
            console.log(error);
        }
    }
    }
    

export default new AdminService();

// Que verga esta palabra "new"?