/* eslint-disable complexity */
const {QueryTypes} = require('sequelize')
const {getCurrentDateTime} = require('../services/helper')
const statuses = [
  {status: 'Selected', type: QueryTypes.SELECT},
  {status: 'Created', method: 'addBook', type: QueryTypes.INSERT},
  {status: 'Updated', method: 'updateBook', type: QueryTypes.UPDATE},
  {status: 'Deleted', method: 'deletingBook', type: QueryTypes.DELETE},
]
const bcrypt = require('bcrypt')
const {getToken, getRefToken} = require('../services/helper')

exports.Mutation = {
  getToken: async (parent, args, context) => {
    try {
      const select = `select * from User_Table where email= "${args.email}"`
      const users = await context.sequelize.query(select, statuses[0].type)
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
      const users = await context.sequelize.query(select, statuses[0].type)
      if (users.length > 0) {
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
  addBook: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
    try {
      // Checking if author exist
      const searchingForAuthorID = `SELECT author_id FROM Author where name="${args.book.author}"`
      const responseSearchingForAuthorID = await context.sequelize.query(searchingForAuthorID, {
        replacements: [null],
        type: statuses[0].type,
      })
      let creatingAuthor
      if (responseSearchingForAuthorID.length === 0) {
        // Adding author into Author table
        const selectAuthor = `INSERT INTO Author (name) VALUES ("${args.book.author}") 
      ON DUPLICATE KEY UPDATE name = "${args.book.author}"`
        creatingAuthor = await context.sequelize.query(selectAuthor, statuses[1].type)
      }
      const authorId = creatingAuthor === undefined ? responseSearchingForAuthorID[0].author_id : creatingAuthor[0]
      // check if Book wasn't created before
      const checkBook = `SELECT count(isbn) as checked from Book 
      where isbn= ${args.book.isbn} and title= "${args.book.title}"`
      const responseCheck = await context.sequelize.query(checkBook, {
        replacements: [null],
        type: statuses[0].type,
      })
      if (responseCheck[0].checked === 0) {
        // Adding book into Book table
        const selectBook = `INSERT INTO Book (isbn, title, year, genres, rating, User_Table_user_id, Author_author_id)
      VALUES (${args.book.isbn}, "${args.book.title}", ${args.book.year}, "${args.book.genres}", ${args.book.rating},
        ${authorized.user.user_id}, ${authorId}) 
      ON DUPLICATE KEY UPDATE title = "${args.book.title}"`
        await context.sequelize.query(selectBook, statuses[1].type)
        try {
        // Adding status of book into Status table
          const insertStatus = `INSERT INTO Status(status, updated_at, user, isbn, title, year, genres, rating)
        VALUES("${statuses[1].status}","${getCurrentDateTime()}","${authorized.user.name}", ${args.book.isbn}, 
        "${args.book.title}", ${args.book.year}, "${args.book.genres}", ${args.book.rating})`
          await context.sequelize.query(insertStatus, statuses[1].type)
        } catch (error) {
        // we are catching Sequalize error, with type DATETIME, but it will insert it
        }
        return {message:statuses[1].status, book: args.book}
      } else throw new Error('Book was created before')
    } catch (error) {
      throw new Error(error)
    }
  },
  updateBook: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
    try {
      // Checking if author exist
      const searchingForAuthorID = `SELECT author_id FROM Author where name="${args.book.author}"`
      const responseSearchingForAuthorID = await context.sequelize.query(searchingForAuthorID, {
        replacements: [null],
        type: statuses[0].type,
      })
      let creatingAuthor
      if (responseSearchingForAuthorID.length === 0) {
        // Adding author into Author table
        const selectAuthor = `INSERT INTO Author (name) VALUES ("${args.book.author}") 
              ON DUPLICATE KEY UPDATE name = "${args.book.author}"`
        creatingAuthor = await context.sequelize.query(selectAuthor, statuses[1].type)
      }
      const authorId = creatingAuthor === undefined ? responseSearchingForAuthorID[0].author_id : creatingAuthor[0]
      // Update into book table
      const updateBook = `UPDATE Book SET title = "${args.book.title}", 
            year = "${args.book.year}", genres = "${args.book.genres}", rating = ${args.book.rating}, 
            Author_author_id = ${authorId}
            WHERE isbn = ${args.book.isbn}`
      await context.sequelize.query(updateBook, {type: statuses[2].type})

      try {
      // Adding status of book into Status table
        const insertStatus = `INSERT INTO Status(status, updated_at, user, isbn, title, year, genres, rating)
         VALUES("${statuses[2].status}","${getCurrentDateTime()}","${authorized.user.name}", ${args.book.isbn}, 
       "${args.book.title}", ${args.book.year}, "${args.book.genres}", ${args.book.rating})`
        await context.sequelize.query(insertStatus, statuses[1].type)
      } catch (error) {
        // we are catching Sequalize error, with type DATETIME, but it will insert it
      }
      return {message:statuses[2].status, book: args.book}
    } catch (error) {
      throw new Error(error)
    }
  },
  removeBook: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
    try {
      // Select for next queries
      const selectBook = `SELECT * from Book LEFT JOIN Author
      ON Book.Author_author_id = Author.author_id where isbn=${args.id};`
      const response = await context.sequelize.query(selectBook, {type: statuses[0].type})
      // Check how many books author has
      const selecAuthor = `SELECT count(isbn) as count from Book where Author_author_id="${response[0].author_id}";`
      const responseAuthor = await context.sequelize.query(selecAuthor, {type: statuses[0].type})
      // IF author has only one book we can delete him
      if (responseAuthor[0].count === 1) {
        const select = `DELETE FROM Author WHERE author_id=${args.id};`
        await context.sequelize.query(select, {type: statuses[3].type})
      }
      if (response.length > 0) {
        // Deleting book
        const select = `DELETE FROM Book WHERE isbn=${args.id};`
        await context.sequelize.query(select, {type: statuses[3].type})
        try {
        // Adding status of book into Status table
          const insertStatus = `INSERT INTO Status(status, updated_at, user, isbn, title, year, genres, rating)
             VALUES("${statuses[3].status}","${getCurrentDateTime()}","${authorized.user.name}", ${args.id}, 
            "${response[0].title}", ${response[0].year}, "${response[0].genres}", ${response[0].rating})`
          await context.sequelize.query(insertStatus, statuses[3].type)
        } catch (error) {
        // we are catching Sequalize error, with type DATETIME, but it will insert it
        }
        return `${statuses[3].status}`
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  createUser: async (parent, args, context) => {
    try {
      const select = `SELECT COUNT(user_id) as count FROM User_Table 
      WHERE email= "${args.user.email}" OR name= "${args.user.email}"`
      const userExist = await context.sequelize.query(select, {
        replacements: [null],
        type: statuses[0].type,
      })
      if (userExist[0].count === 1) throw new Error(`User with current email: ${args.user.email} already exist`)
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(args.user.password, salt)
      const user = {...args.user, password: password}
      const selectUser = `INSERT INTO User_Table (name,email,password,role) 
        VALUES ("${user.name}","${user.email}","${user.password}","${user.role}")`
      await context.sequelize.query(selectUser, statuses[1].type)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}
