/**
 * @swagger
 * tags:
 *     name: Products
 *     description: Products API REST
 */

/**
 * @swagger
 * components:
 *  schemas: 
 *      Products:
 *          type: object
 *          requires:
 *              -sku
 *              -item
 *              -brand
 *              -description
 *          properties:
 *              sku:
 *                  type: string
 *                  description: Unique identifier
 *              item:
 *                  type: string
 *                  description: product name
 *              brand:
 *                  type: string
 *                  description: manufacturer name
 *              description:
 *                  type: string
 *                  description: product details
 */
const   express =   require('express');
const   app     =   express();

const products  =   [
    {sku: 'A001', item: 'Macbook Air 13', brand: 'Apple', description: 'Lorem Ipsum ....'},
    {sku: 'A023', item: 'Ipad Pro', brand: 'Apple', description: 'Lorem Ipsum ....'},
    {sku: 'A033', item: 'Xiaomi Redmi 9', brand: 'Xiaomi', description: 'Lorem Ipsum ....'},
];

/**
 * @swagger
 * /products/search?brand=term:
 *     get:
 *      sumary: return products matched by brand
 *      tags:   [Search Poducts]
 *      parameters: 
 *          -in: query
 *          name: brand
 *          schema:
 *              type: string
 *          required: true
 *          description: brand product
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: 'json response { products: <array-products> | [] }'
 *          400: 
 *              description: 'Incorrect query params'
 *          500:
 *              description: 'Server Error'
 */

// ** Petición GET **
app.get('/search', (req,res) => {
    // Validación de datos de la query
    if (!req.query.brand) {
        return res.status(400).json({
        })
    }
    // almacenamos los resultados en un array por el campo brand método filter()
    const productsSelected  =   products.filter(el => el.brand === req.query.brand);
    res.status(200).json({
        message: 'Ok',
        products: productsSelected
    })
})
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Añade un nuevo producto al sistema
 *     tags: [Create Products] 
 *     description: Esta petición permite añadir un nuevo producto al array de productos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 description: Product
 *                 example: "A001"
 *               item:
 *                 type: string
 *                 description: Product name
 *                 example: 'Mackbook Air'
 *               brand:
 *                 type: string
 *                 description: Product brand
 *                 example: 'Apple'
 *               description:
 *                 type: string
 *                 description: Product details
 *                 example: 'Lorem Ipsum ....'
 *     responses:
 *       200:
 *         description: Producto añadido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *                 product:
 *                   type: object
 *                   properties:
 *                     sku:
 *                       type: string
 *                       example: "A1023"
 *                     item:
 *                       type: string
 *                       example: 'Galaxy 13'
 *                     brand:
 *                       type: string
 *                       example: 'Apple'
 *                     description:
 *                       type: string
 *                       example: 'Lorem Ipsum ....'
 *       400:
 *         description: Datos del producto son obligatorios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product data mandatory"
 */
// ** Petición POST **
app.post('/', (req,res) => {
    // Validación de la data
    if (!req.body) {
        return res.status(400).json({
            message:    'Product data mandatory'
        })
    }
    // Añadimos un producto al array método PUSH
    products.push(req.body);
    res.status(200).json({
        message: 'ok',
        // recogemos el último producto del array
        product:    products[products.length - 1]
    })
})
/**
 * @swagger
 * /products/{sku}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Upload Products] 
 *     description: Actualiza las propiedades de un producto existente identificado por su SKU. Si el SKU no se encuentra o los datos son incorrectos, se devuelve un error.
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: SKU único del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 description: Unique Identifier
 *                 example: "A001"
 *               item:
 *                 type: string
 *                 description: Product Name
 *                 example: 'Galaxy Plus 13'
 *               brand:
 *                 type: string
 *                 description: 'Manufacter name'
 *                 example: 'Apple'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ok"
 *                 product:
 *                   type: object
 *                   properties:
 *                     sku:
 *                       type: string
 *                       example: "12345"
 *                     item:
 *                       type: string
 *                       example: "Laptop"
 *                     brand:
 *                       type: string
 *                       example: 'Apple'
 *                     description:
 *                       type: string
 *                       example: 'Lorem Ipsum ...'
 *       400:
 *         description: Datos incorrectos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incorrect data mandatory"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item sku not found"
 */
// ** Petición PUT **
app.put('/:sku', (req,res) => {
    // 1.- Validamos que los parámetros de la petición existen
    if (!req.body || !req.params.sku) {
        return res.status(400).json({
            message: 'Incorrect data mandatory'
        })
    }
    // 2.- Buscamos el producto en el Array con el parámetro sku método findIndex()
    const productIndex  =   products.findIndex(elem => {
        return elem.sku === req.params.sku;
    })
    // 3.- Validamos si no se encuentra el producto
    if (productIndex < 0) {
        return res.status(404).json({
            message: 'Item sku not found',
        })
    }
    // 4.- Recorremos las propiedades del producto y cambiamos los valores
    for(const property in req.body) {
        console.log(property);
        products[productIndex][property]    =   req.body[property]
    }
    // 5.- Devolvemos el producto modificado
    res.status(200).json({
        message: 'Ok',
        product: products[productIndex]
    })
})
/**
 * @swagger
 * /{sku}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Delete Product] 
 *     description: Elimina un producto del listado utilizando su SKU como identificador único. Devuelve un mensaje de éxito o un error si no se encuentra el producto.
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: SKU único del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *                 deletedItem:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sku:
 *                         type: string
 *                         example: "12345"
 *                       name:
 *                         type: string
 *                         example: "Laptop"
 *                       price:
 *                         type: number
 *                         example: 999.99
 *                       stock:
 *                         type: integer
 *                         example: 10
 *       400:
 *         description: Parámetros faltantes o datos incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incorrect data mandatory"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item sku not found"
 */
// ** Petición DELETE **
app.delete('/:sku', (req,res) => {
    // 1.- Validamos que los parámetros de la petición existen
    if (!req.body || !req.params.sku) {
        return res.status(400).json({
            message: 'Incorrect data mandatory'
        })
    }
    // 2.- Buscamos el producto en el Array con el parámetro sku método findIndex()
    const productIndex  =   products.findIndex(elem => {
        return elem.sku === req.params.sku;
    })
    // 3.- Validamos si no se encuentra el producto
    if (productIndex < 0) {
        return res.status(404).json({
            message: 'Item sku not found',
        })
    }
    // 4.- Borramos y almacenamos el item encontrado con método splice().
    const deletedItem   =   products.splice(productIndex, 1);
    res.status(200).json({
        message: 'ok',
        deletedItem
    })
})    

module.exports  =   app;