/* eslint-disable complexity */
const {QueryTypes} = require('sequelize')
const type = {type: QueryTypes.SELECT}

exports.Query = {
  getAllBooks: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
    try {
      // Pagination
      const limit = args.limit || 25
      const offset = args.offset || 0
      const select = `select isbn, title, year, genres, rating, name as author 
    from Book LEFT JOIN Author ON Book.Author_author_id = Author.author_id 
    order by isbn limit ${limit} offset ${offset}`
      const books = await context.sequelize.query(select, type)
      return books
    } catch (error) {
      throw new Error(error)
    }
  },
  getStatuses: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
    try {
      // Pagination
      const limit = args.limit || 25
      const offset = args.offset || 0
      const select = `select * from Status where isbn=${args.id}
      order by isbn limit ${limit} offset ${offset}`
      const statuses = await context.sequelize.query(select, type)
      return statuses
    } catch (error) {
      throw new Error(error)
    }
  },
  getSpecificBooks: async (parent, args, context) => {
    try {
      const select = `Select isbn, title, year, genres, rating, name as author from Book LEFT JOIN Author
    ON Book.Author_author_id = Author.author_id where title="${args.title}" OR name="${args.author}"`
      const books = await context.sequelize.query(select, type)
      return books
    } catch (error) {
      throw new Error(error)
    }
  }
}
