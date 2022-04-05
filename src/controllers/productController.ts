import Products from '../models/productModel'
import { ApiProduct } from '../lib/productLib'

const productController = {
  getProducts: async (req, res) => {
    try {     
      const libProduct = new ApiProduct(Products.find(), req.query).paginating().sorting().search().filter()
      const result = await Promise.allSettled([
        libProduct.query,
        Products.countDocuments()
      ])
      const pageCurrent = req.query.page
      const limitCurrent = libProduct.query.options.limit
      const products = result[0].status === 'fulfilled' ? result[0].value : []
      const count = result[1].status === 'fulfilled' ? result[1].value : 0
      
      return res.status(200).json({ products, count, page: pageCurrent, limit: limitCurrent })
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