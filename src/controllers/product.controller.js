'use strict';

const { Created, Ok } = require('../core/success.response');
const ProductService = require('../services/product.service');

class ProductController {
    /**
     * Create new product
     * @param {String} productName - name of product
     * @param {String} productThumb - url of product's thumbnail
     * @param {String} productDescription - description of product
     * @param {Number} productPrice - price of product
     * @param {Number} productQuantity - quantity of product
     * @param {String} productType - type of product
     * @param {Array} productAttributes - attributes of product
     * @param {Array} productVariations - variations of product
     * @return {JSON}
     */
    create = async (req, res) => {
        new Created({
            message: 'Create new product successfully',
            metadata: await ProductService.createProduct(req.body.productType, {
                ...req.body,
                productShop: req.user.userId,
            }),
        }).send(res);
    };

    /**
     * Update a product by id with shop
     * @param {Number} productId
     * @param {String} productName - name of product
     * @param {String} productThumb - url of product's thumbnail
     * @param {String} productDescription - description of product
     * @param {Number} productPrice - price of product
     * @param {Number} productQuantity - quantity of product
     * @param {String} productType - type of product
     * @param {Array} productAttributes - attributes of product
     * @param {Array} productVariations - variations of product
     * @return {JSON}
     */
    update = async (req, res) => {
        new Ok({
            message: 'Update a product successfully',
            metadata: await ProductService.updateProduct({
                type: req.body.productType,
                productId: req.params.id,
                productShop: req.user.userId,
                payload: {
                    ...req.body,
                    productShop: req.user.userId,
                },
            }),
        }).send(res);
    };

    /**
     * Get all draft products of shop
     * @param {Number} limit
     * @param {Number} skip
     * @return {JSON}
     */
    getAllDraftProducts = async (req, res) => {
        new Ok({
            message: 'Get all draft products successfully',
            metadata: await ProductService.getAllDraftProducts({
                productShop: req.user.userId,
                limit: req.query.limit,
                skip: req.query.skip,
            }),
        }).send(res);
    };

    /**
     * Get all published products of shop
     * @param {Number} limit
     * @param {Number} skip
     * @return {JSON}
     */
    getAllPublishedProducts = async (req, res) => {
        new Ok({
            message: 'Get all published products successfully',
            metadata: await ProductService.getAllPublishedProducts({
                productShop: req.user.userId,
                limit: req.query.limit,
                skip: req.query.skip,
            }),
        }).send(res);
    };

    /**
     * Publish a product by shop
     * @param {Number} productId
     * @return {JSON}
     */
    publishProductByShop = async (req, res) => {
        new Ok({
            message: 'Publish product successfully',
            metadata: await ProductService.publishProductByShop({
                productShop: req.user.userId,
                productId: req.params.id,
            }),
        }).send(res);
    };

    /**
     * Un publish a product by shop
     * @param {Number} productId
     * @return {JSON}
     */
    unPublishProductByShop = async (req, res) => {
        new Ok({
            message: 'Un Publish product successfully',
            metadata: await ProductService.unPublishProductByShop({
                productShop: req.user.userId,
                productId: req.params.id,
            }),
        }).send(res);
    };

    /**
     * Search products by keyword
     * @param {String} keyword
     * @return {JSON}
     */
    searchByKeyword = async (req, res) => {
        new Ok({
            message: 'Search products successfully',
            metadata: await ProductService.searchProductsByKeyword(req.params),
        }).send(res);
    };

    /**
     * Get all products
     * @param {Number} limit
     * @param {String} sort
     * @param {Number} page
     * @return {JSON}
     */
    getAllProducts = async (req, res) => {
        new Ok({
            message: 'Get all products successfully',
            metadata: await ProductService.getAllProducts(req.query),
        }).send(res);
    };

    /**
     * Find a product by id
     * @param {Number} productId
     * @return {JSON}
     */
    findProduct = async (req, res) => {
        new Ok({
            message: 'Find a product successfully',
            metadata: await ProductService.findProduct({
                productId: req.params.id,
            }),
        }).send(res);
    };
}

module.exports = new ProductController();
