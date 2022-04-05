import Products from '../models/productModel'

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.find()

      return res.status(200).json(products)

    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id)
      if (!product) {
        return res.status(404).json({ msg: 'This product does not exist.'})
      }
      return res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },

  addProduct: async (req, res) => {
    try {
      const { title, price, image, description, category } = req.body
      const newProduct = new Products({
        title, price, image, description, category
      })
      await newProduct.save()

      return res.status(200).json(newProduct)
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { title, price, image, description, category } = req.body
      const product = await Products.findByIdAndUpdate(req.params.id, {
        title, price, image, description, category
      }, { new: true})

      if (!product) {
        return res.status(404).json({ msg: 'This product does not exist.'})
      }

      return res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id)

      if(!product) 
        return res.status(404).json({msg: 'This product does not exist.'})

      return res.status(200).json({msg: 'Delete Success!'})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

export default productController