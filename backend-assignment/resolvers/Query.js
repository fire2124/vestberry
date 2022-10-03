/* eslint-disable complexity */
const {QueryTypes} = require('sequelize')
const {getToken, getRefToken} = require('../services/helper')
const type = {type: QueryTypes.SELECT}
const bcrypt = require('bcrypt')

exports.Query = {
  getToken: async (parent, args, context) => {
    try {
      const select = `select * from User_Table where email= "${args.email}"`
      const users = await context.sequelize.query(select, type)
      const compared = bcrypt.compare(args.password, users[0].password)
      if (compared) {
        const token = getToken(users[0])
        const reftoken = getRefToken(users[0])
        return {token: token, refreshToken: reftoken}
      } else {
        throw new Error('Unregistered user')
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  getNewToken: async (parent, args, context) => {
    try {
      const authorized = context.getAuthorized(args.token)
      const select = `select * from User_Table where name= "${authorized.user.name}"`
      const users = await context.sequelize.query(select, type)
      if (users.length === 1) {
        const token = getToken(users[0])
        const reftoken = getRefToken(users[0])
        return {token: token, refreshToken: reftoken}
      } else {
        throw new Error('Unregistered user')
      }
    } catch (error) {
      throw new Error(error)
    }
  },
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
      const select = `select * from Status where isbn=${args.id}`
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
