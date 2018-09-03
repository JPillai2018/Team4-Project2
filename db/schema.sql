### Schema

CREATE DATABASE secure;

USE secure;

CREATE TABLE users
(
	id int(11) AUTO_INCREMENT NOT NULL,
	username VARCHAR(15) NOT NULL UNIQUE,
	email VARCHAR(50 ) NOT NULL UNIQUE,
	passcode BINARY(20) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL,
	PRIMARY KEY (id) 
);

CREATE TABLE doggyblog
(
	emaildog int NOT NULL AUTO_INCREMENT,
	dog_name varchar(50) NOT NULL,
	parent_name varchar(50) NOT NULL,
	blogPost varchar(255) NOT NULL,
	PRIMARY KEY (emaildog),
	FOREIGN KEY (emaildog) REFERENCES users(email)
);
