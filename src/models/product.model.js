import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL', 'Unique'],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    brand: {
      type: String,
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    variants: [variantSchema],
    images: [
      {
        url: String,
        altText: String,
      },
    ],
    features: {
      isFeatured: Boolean,
      isOnSale: Boolean,
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },
    specifications: Map,
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Índices para búsquedas rápidas
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, 'features.isFeatured': 1 });

// Middleware para actualizar fecha de modificación
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Método para calcular stock total
productSchema.virtual('totalStock').get(function () {
  return this.variants.reduce((sum, variant) => sum + variant.stock, 0);
});

// Método para aplicar descuentos
productSchema.methods.applyDiscount = function (percentage) {
  this.variants.forEach((variant) => {
    variant.price = variant.price * (1 - percentage / 100);
  });
};

export default mongoose.model('Product', productSchema);
