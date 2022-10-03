use mysql;
SET SQL_SAFE_UPDATES = 0;
SET SESSION SQL_MODE='ALLOW_INVALID_DATES';

#show tables;

#select * from User_Table;
#select * from Book order by isbn limit 5 offset 0;
#select * from Book;
select * from Status ;

#select * from Author;
#DROP TABLE User_Table;
#DROP TABLE Status;
#DROP TABLE Book;

#DELETE FROM Author WHERE name='ROMAN';

-- INSERT INTO Author(name) VALUES("Author") 
-- ON DUPLICATE KEY UPDATE name = "Author";
      
#SELECT * from Book LEFT JOIN Author
#ON Book.Author_author_id = Author.author_id where isbn=1;

#SELECT * from Book where isbn= 65466 and title= "Pirates"

#UPDATE Book
#SET title = "Pirates from Caribean", year = 2022, genres = "Action", rating = 0
#WHERE isbn = 6;
