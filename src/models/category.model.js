import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  slug: { type: String, unique: true },
  description: String,
});

export default mongoose.model('Category', categorySchema);
