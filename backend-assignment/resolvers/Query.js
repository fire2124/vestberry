
const {QueryTypes} = require('sequelize')
const {getToken, getRefToken} = require('../services/helper')
const type = {type: QueryTypes.SELECT}

exports.Query = {
  getToken: async (parent, args, context) => {
    const select = `select user_id, name, email, role from User_Table 
    where email= "${args.email}" && password="${args.password}"`
    const users = await context.sequelize.query(select, type)
    if (users.length === 1) {
      const token = getToken(users[0])
      const reftoken = getRefToken(users[0])
      return {token:token, refreshToken:reftoken}
    } else {
      throw new Error('unregistered user')
    }
  },
  getNewToken: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    const select = `select user_id, name, email, role from User_Table 
    where name= "${authorized.user.name}"`
    const users = await context.sequelize.query(select, type)
    if (users.length === 1) {
      const token = getToken(users[0])
      const reftoken = getRefToken(users[0])
      return {token:token, refreshToken:reftoken}
    } else {
      throw new Error('unregistered user')
    }
  },
  getAllBooks: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    // Pagination
    const limit = args.limit || 25
    const offset = args.offset || 0
    if (authorized.code === 403) throw authorized
    const select = `select * from Book order by isbn limit ${limit} offset ${offset}`
    const books = await context.sequelize.query(select, type)
    return books
  },
  getStatuses: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
    const select = `select * from Status where isbn=${args.id}`
    const statuses = await context.sequelize.query(select, type)
    return statuses
  },
  getSpecificBooks: async (parent, args, context) => {
    // TODO: Check join on
    const select = `Select isbn, title, year, genres, rating, name as author from book FULL JOIN Author
     where title="${args.title}" OR name="${args.author}"`
    const books = await context.sequelize.query(select, type)
    return books
  }
}
