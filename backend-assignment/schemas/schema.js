const {gql} = require('apollo-server-express')
// Scaler Type
// String Int, Float, Boolean, ID!

// The GraphQL schema
// Each function return value type

exports.typeDefs = gql`
    type Query {
        hello: String
        getToken(email:String!, password: String!): TokenType!
        getAllBooks(token:String!):[Book]!
        getStatuses(token:String!):[Status]!
        getSpecificBooks(title:String, author:String):[BookAuthor]!
    }
    type Mutation{
        addBook(token:String!,book:addBookInput!):BookAuthor
    }

    type TokenType{
        token:String!, refreshToken:String!
    }
    type Book{
        isbn: ID!
        title: String!
        year: String!
        genres: String!
        rating: Int!
        User_user_id: Int!
        Author_author_id:Int!
    }
    type Status{
        status_id: ID!
        status: String!
        updated_at: String!
        Book_isbn: Int!
        Book_User_User_id: Int
    }

    type CreatingBook{
        status:Int
        data: BookAuthor
        error: String
    }
    type BookAuthor{
        isbn: ID!
        title: String!
        year: String!
        genres: String!
        rating: Int!
        author:String!
    }

    input addBookInput{
        isbn: ID!
        title: String!
        year: String!
        genres: String!
        rating: Int!
        author:String!
    }
`
