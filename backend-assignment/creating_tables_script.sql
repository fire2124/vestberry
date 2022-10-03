use mysql;
show tables;

CREATE TABLE IF NOT EXISTS `mysql`.`User_Table` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `mysql`.`Book` (
  `isbn` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `year` YEAR(4) NULL,
  `genres` VARCHAR(45) NULL,
  `rating` VARCHAR(45) NULL,
  `Author_author_id` INT NOT NULL,
  `User_Table_user_id` INT NOT NULL,
  PRIMARY KEY (`isbn`, `Author_author_id`, `User_Table_user_id`),
  UNIQUE INDEX `isbn_UNIQUE` (`isbn` ASC) VISIBLE,
  INDEX `fk_Book_Author1_idx` (`Author_author_id` ASC) VISIBLE,
  INDEX `fk_Book_User_Table1_idx` (`User_Table_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Book_Author1`
    FOREIGN KEY (`Author_author_id`)
    REFERENCES `mysql`.`Author` (`author_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Book_User_Table1`
    FOREIGN KEY (`User_Table_user_id`)
    REFERENCES `mysql`.`User_Table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- CREATE TABLE IF NOT EXISTS `mysql`.`Author` (
--   `author_id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NULL,
--   PRIMARY KEY (`author_id`),
--   UNIQUE INDEX `author_id_UNIQUE` (`author_id` ASC) VISIBLE)
-- ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mysql`.`Status` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL,
  `updated_at` DATETIME NULL,
  `user` VARCHAR(45) NULL,
  `isbn` INT NULL,
  `title` VARCHAR(45) NULL,
  `year` YEAR NULL,
  `genres` VARCHAR(45) NULL,
  `rating` INT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE INDEX `status_id_UNIQUE` (`status_id` ASC) VISIBLE)
ENGINE = InnoDB;
