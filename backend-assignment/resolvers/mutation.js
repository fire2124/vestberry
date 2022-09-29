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
    // TODO: check why I will get two responses from sequelize and make every insert to be possible just once
    const authorized = context.getAuthorized(args.token)
    if (authorized.code === 403) throw authorized
    try {
      // Checking if author exist
      const searchingForAuthorID = `SELECT author_id FROM Author where name="${args.book.author}"`
      const responseSearchingForAuthorID = await context.sequelize.query(searchingForAuthorID, statuses[0].type)

      let creatingAuthor
      if (responseSearchingForAuthorID[0].length === 0) {
        // Adding author into Author table
        const selectAuthor = `INSERT INTO Author (name) VALUES ("${args.book.author}") 
      ON DUPLICATE KEY UPDATE name = "${args.book.author}"`
        creatingAuthor = await context.sequelize.query(selectAuthor, statuses[1].type)
      }

      const authorId = creatingAuthor === undefined ? responseSearchingForAuthorID[0][0].author_id : creatingAuthor[0]

      // Adding book into Book table
      const selectBook = `INSERT INTO Book (isbn, title, year, genres, rating, User_user_id, Author_author_id)
    VALUES (${args.book.isbn}, "${args.book.title}", ${args.book.year}, "${args.book.genres}", ${args.book.rating},
         ${authorized.user.user_id}, ${authorId}) 
         ON DUPLICATE KEY UPDATE title = "${args.book.title}"`

      await context.sequelize.query(selectBook, statuses[1].type)

      // Adding status of book into Status table
      const selectStatus = `INSERT INTO Status(status, updated_at, Book_isbn, Book_User_user_id)
        VALUES("${statuses[1].status}","${getCurrentDateTime()}",${args.book.isbn},${authorized.user.user_id})`
      await context.sequelize.query(selectStatus, statuses[1].type)
      return args.book
      // return {status:200, data: args.book}
    } catch (error) {
      return error
    }
  }
}
