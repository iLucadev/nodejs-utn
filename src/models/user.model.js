const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], enum: ['user', 'admin'], default: ['user'] },
    addresses: [
      {
        street: String,
        city: String,
        country: String,
        zipCode: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
