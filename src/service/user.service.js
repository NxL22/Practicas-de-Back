import axios from "axios";
import UserEntity from "../entity/user.entity.js";
import EncriptionFunc from "../utils/jwt.encription.js";
import bcrypt from 'bcrypt';
import UserRole from '../utils/enum/user-role.enum.js';

class UserService {

    // async createUser(userData) {
    //     const { username, email, password } = userData;
    //     try {
    //         if (!username || !email || !password) throw new Error('Faltan datos chamo')

    //         const userExists = await UserEntity.findOne({ where: { email } });


    //         if (userExists) {
    //             throw new Error('Usuario ya existe');
    //         }
    //         const hashedPassword = await bcrypt.hash(password, 10);

    //         // Crear el usuario con la contraseña hasheada
    //         const newUser = await UserEntity.create({ username, email, password: hashedPassword });
    //         delete newUser.dataValues.password;
    //         return newUser;
    //     } catch (error) {
    //         throw new Error('Error al crear usuario: ' + error.message);
    //     }
    // }

    async loginUser(email, password) {
        try {
            const user = await UserEntity.findOne({ where: { email } });
            if (!user) throw new Error("El usuario no existe");
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("La contraseña es incorrecta");
            const token =  EncriptionFunc.generateToken(user);
            delete user.dataValues.password;
            return { user, token };
        } catch (error) {
            throw new Error("Error al buscar el usuario: " + error.message);
        }
    }

    async prueba(email, password) {
        try {
            const userExists = await this.userByEmail(email)
            if (!userExists) {
                throw new Error("Te faltan datos");
            }
            const isMatch = await bcrypt.compare(password, userExists.password);
            if (!isMatch) throw new Error("Te faltan datos");
            const token =  EncriptionFunc.prueba(userExists);
            delete userExists.dataValues.password;
            return  { userExists, token };
        } catch (error) {
            throw new Error("Error al buscar el usuario: " + error.message);
        }
    }

    async userByEmail(email) {
        try {
            const user = await UserEntity.findOne({ where: { email } });
            return user
        } catch (error) {
            throw new Error("Error al buscar el usuario: " + error.message);
        }
    }

    async createUser(userData) {
        const { name , email, password } = userData;
        try {
            if (!name || !email || !password) throw new Error('Faltan datos chamo')

            const userExists = await UserEntity.findOne({ where: { email } });


            if (userExists) {
                throw new Error('Usuario ya existe');
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario con la contraseña hasheada
            const newUser = await UserEntity.create({ name, email, password: hashedPassword , role:UserRole.User});
            delete newUser.dataValues.password;
            return newUser;
        } catch (error) {
            throw new Error('Error al crear usuario: ' + error.message);
        }
    }

    async getUsers() {
        try {
            const users = await UserEntity.findAll();
            return users;
        } catch (error) {
            throw new Error('Error al obtener usuarios: ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            const user = await UserEntity.findByPk(userId);
            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario por ID: ' + error.message);
        }
    }

    async getTwoQuerysUsers(query) {
        try {
            const { id, email } = query;

            let user = null;

            // Buscar usuario por ID si se proporciona
            if (id) {
                user = await UserEntity.findOne({ where: { id } });
            }

            // Si no se encontró usuario por ID, buscar por email
            if (!user && email) {
                user = await UserEntity.findOne({ where: { email } });
            }

            // Verificar si se encontró un usuario
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario: ' + error.message);
        }
    }




    async getUserByEmail(userEmail) {
        try {
            console.log(userEmail);
            const user = await UserEntity.findOne({ where: { email: userEmail } });
            setTimeout(axios.post('http://localhost:3000', user, 8000))
            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario por correo electrónico: ' + error.message);
        }
    }

    scope() {

        let a;

        console.log(a);

        (() => {
            a = 'ricolin'
            console.log(a);
        })();
        console.log(a);
        a = 'facilito'
        console.log(a);
        return;
    }


    // Llamar a la función closter



    async updateUser(userId, userData) {
        const { username, email, password } = userData
        try {
            const user = await UserEntity.findByPk(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            await user.update({ username, email, password });
            return user;
        } catch (error) {
            throw new Error('Error al actualizar usuario: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            const user = await UserEntity.findByPk(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            await user.destroy();
            return 'usuario ha sido eliminado';
        } catch (error) {
            throw new Error('Error al eliminar usuario: ' + error.message);
        }

        /*
            async getTwoUsers(id) {
                    try {
                        const user = await UserEntity.findByPk(userId);
                    } catch (error) {
        
                    }
                }
        
        */

    }
}

export default new UserService();

// Que verga esta palabra "new"?