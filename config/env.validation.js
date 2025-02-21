export const checkEnv = () => {
  const required = ['DB_URI', 'JWT_SECRET'];

  const missing = required.filter((field) => !process.env[field]);

  if (missing.length > 0) {
    throw new Error(`Missing variables: ${missing.join(', ')}`);
  }
};
