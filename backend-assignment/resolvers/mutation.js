/* eslint-disable complexity */
const {QueryTypes} = require('sequelize')
const {getCurrentDateTime} = require('../services/helper')
const statuses = [
  {status: 'Selected', type: QueryTypes.SELECT},
  {status: 'Created', method:'addBook', type: QueryTypes.INSERT},
  {status: 'Updated', method:'updateBook', type: QueryTypes.UPDATE},
  {status: 'Deleted', method:'deletingBook', type: QueryTypes.DELETE},
]
exports.Mutation = {
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
      if (responseSearchingForAuthorID[0].length === 0) {
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
        const selectBook = `INSERT INTO Book (isbn, title, year, genres, rating, User_user_id, Author_author_id)
      VALUES (${args.book.isbn}, "${args.book.title}", ${args.book.year}, "${args.book.genres}", ${args.book.rating},
        ${authorized.user.user_id}, ${authorId}) 
      ON DUPLICATE KEY UPDATE title = "${args.book.title}"`
        await context.sequelize.query(selectBook, statuses[1].type)
        // Adding status of book into Status table
        const insertStatus = `INSERT INTO Status(status, updated_at, user, isbn, title, year, genres, rating)
        VALUES("${statuses[1].status}","${getCurrentDateTime()}","${authorized.user.name}", ${args.book.isbn}, 
        "${args.book.title}", ${args.book.year}, "${args.book.genres}", ${args.book.rating})`
        await context.sequelize.query(insertStatus, statuses[1].type)
        return args.book
      } else throw new Error('Book was created before')
    } catch (error) {
      throw new Error(error)
    }
  },
  updateBook: async (parent, args, context) => {
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
  },
  removeBook: async (parent, args, context) => {
    // TODO: check sequalize error for DATETIME
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
        // Adding status of book into Status table
        const insertStatus = `INSERT INTO Status(status, updated_at, user, isbn, title, year, genres, rating)
        VALUES("${statuses[3].status}","${getCurrentDateTime()}","${authorized.user.name}", ${args.id}, 
        "${response[0].title}", ${response[0].year}, "${response[0].genres}", ${response[0].rating})`
        await context.sequelize.query(insertStatus, statuses[3].type)
        return 'Removed'
      }
    } catch (error) {
      throw new Error(error)
    }
  }

}
