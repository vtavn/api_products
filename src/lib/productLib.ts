export function ApiProduct(query, queryString) {
  this.query = query
  this.queryString = queryString

  this.paginating = () => {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 5
    const skip = limit * (page - 1)
    this.query = this.query.limit(limit).skip(skip)
    return this
  }

  this.sorting = () => {
    const sort = this.queryString.sort || '-createdAt'
    this.query = this.query.sort(sort)
    return this
  }

  this.search = () => {
    const search = this.queryString.search
    if (search) {
      this.query = this.query.find({
        $text: { $search: search }
      })
    } else {
      this.query = this.query.find()
    }
    return this
  }

  this.filter = () => {
    const queryObject = { ...this.queryString }
    const exludedFields = ['page', 'sort', 'limit', 'search']
    exludedFields.forEach(e => delete(queryObject[e]))
    
    let queryStr = JSON.stringify(queryObject)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }
  
}
