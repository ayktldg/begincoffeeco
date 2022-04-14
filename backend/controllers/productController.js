import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProductStock = async (req, res) => {
  const orderedProducts = req.body;
  const updatedProducts = orderedProducts.map(async (product) => {
    try {
      const query = { _id: product.productId };
      const matchedProducts = await Product.findOneAndUpdate(
        query,
        { $inc: { stockAmount: -product.quantity } },
        { new: true }
      );
      if (!matchedProducts) {
        return {
          message: `There is no product with the id of ${product.productId}`,
        };
      }
      return matchedProducts;
    } catch (err) {
      console.log(err);
    }
  });
  try {
    const result = await Promise.all(updatedProducts);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};
