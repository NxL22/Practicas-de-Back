import ProductEntity from "../entity/product.entity.js"


class ProductService {
    async createProduct(productData) {
        const { name, price, capacity, description , userId} = productData;
        try {
            
            if ( !name || !price || !capacity || !description) throw new Error('Faltan datos amix')
            //y aqui tendria que buscarla en la BD creo y ni idea aaaah no seeeee que sigue
        
            const newProduct = {
                userId,
                name,
                price: parseFloat(price),
                capacity: parseInt(capacity),
                description
            };
            const res= await ProductEntity.create(newProduct);
            return res;

        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    async hello() {
        try {
            const res = "hello world"
            return res
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        
            
        }
    }
}
// GET ALL PRODUCTS


export default new ProductService();
