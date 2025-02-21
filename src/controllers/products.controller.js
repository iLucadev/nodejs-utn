import { asyncHandler } from '../utils/async-handler.js';
import * as productService from '../services/products.service.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query);
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: { product },
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json({
    status: 'success',
    data: { product: newProduct },
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: { product: updatedProduct },
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
