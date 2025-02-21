import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, min: 1, required: true },
  priceAtPurchase: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal'], required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Order', orderSchema);
