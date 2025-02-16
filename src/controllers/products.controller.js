import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    fs.readFile("products.json", function (error, data) {
      if (error) throw error;

      const products = JSON.parse(data);

      return res.status(200).render("products", { products });
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred while getting products",
    });
  }
};

export const getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    fs.readFile("products.json", function (error, data) {
      if (error) throw error;

      const product = JSON.parse(data.find((el) => el.id == id));

      return res.status(200).json({
        status: "OK",
        code: 200,
        result: product,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred while getting product",
    });
  }
};

export const createProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};

export const updateProduct = async (req, res) => {};
