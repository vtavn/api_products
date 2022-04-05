
export const checkProductData = async (req, res, next) => {
  const errors = []

  for(const key in req.body) {
    if (!req.body[key]) {
      errors.push(`Please add product ${key}`)
    }
  }

  if (errors.length > 0) {
    return res.status(404).json({ msg: errors})
  }

  next()
}
