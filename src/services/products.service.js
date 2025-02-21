import Product from '../models/product.model.js';
import { createApiFeatures } from '../utils/api-features.js';
import { createAppError } from '../middlewares/errors/app-error.js';

export const getAllProducts = async (queryParams) => {
  try {
    const features = createApiFeatures(Product.find(), queryParams).filter().sort().paginate();

    const products = await features.exec();

    if (!products.length) throw createAppError('No products found', 404);

    return products;
  } catch (error) {
    throw createAppError(error.message, 500);
  }
};

export const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw createAppError('Product not found', 404);
  return product;
};

export const createProduct = async (productData) => {
  const existingProduct = await Product.findOne({ name: productData.name });
  if (existingProduct) throw createAppError('Product name already exists', 400);

  return await Product.create(productData);
};

export const updateProduct = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) throw createAppError('Product not found', 404);
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) throw createAppError('Product not found', 404);
  return { status: 'success' };
};
