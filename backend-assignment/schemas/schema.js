const {gql} = require('apollo-server-express')
// Scaler Type
// String Int, Float, Boolean, ID!

// The GraphQL schema
// Each function return value type

exports.typeDefs = gql`
    type Query {
        hello: String
        getToken(email:String!, password: String!): TokenType!
        getNewToken(token:String!): TokenType!
        getAllBooks(token:String!,limit:Int, offset: Int):[Book]!
        getStatuses(token:String!,id:ID!):[Status]!
        getSpecificBooks(title:String, author:String):[BookAuthor]!
    }
    type Mutation{
        addBook(token:String!,book:addBookInput!):ResponseBook
        updateBook(token:String!,book:addBookInput!):ResponseBook
        removeBook(token:String!,id:ID!):String
        createUser(user:userInput!):User!
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
        author: String!
    }
    type Status{
        status_id: ID!
        status: String!
        updated_at: String!
        user: String!
        isbn: Int!
        title: String!
        year: String!
        genres: String!
        rating: Int!
    }

    type ResponseBook{
        message: String
        book: BookAuthor
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
    input userInput{
        name: String!
        email: String!
        password: String!
        role: String!
    }
    type User{
        name: String!
        email: String!
        password: String!
        role: String!
    }
`
