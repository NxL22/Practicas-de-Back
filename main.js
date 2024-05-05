console.clear();
import sequelize from "./src/config/db.js";
import httpServer from "./src/config/http.js"
import dotenv from "dotenv";


dotenv.config();

async function bootstrap() {
    const PORT = process.env.PORT;

    try {
        await sequelize.sync({force:true});
        console.log('Conexión a la base de datos establecida correctamente.');

        // Inicia el servidor HTTP
        httpServer.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

bootstrap();
