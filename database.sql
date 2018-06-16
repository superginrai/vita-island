CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE genre (
	id SERIAL PRIMARY KEY,
	name VARCHAR(120)  NOT NULL
);

CREATE TABLE game (
	id SERIAL PRIMARY KEY,
	title VARCHAR (120) NOT NULL,
	favorite BOOLEAN NOT NULL,
	genre_id INT REFERENCES genre NOT NULL,
	person_id INT REFERENCES person NOT NULL,
	image_url VARCHAR (2005),
	complete BOOLEAN,
	sealed BOOLEAN,
	description VARCHAR (5000),
	plu INTEGER
);

INSERT INTO genre (name)
VALUES ('Action'),
('Point and Click'),
('taco'),
('Fighting'),
('Shooter'),
('taco'),
('Music'),
('Platformer'),
('Puzzle'),
('Racing'),
('Real-Time-Strategy'),
('RPG'),
('Simulator'),
('Sports'),
('Strategy'),
('Turn-Based-Strategy'),
('taco'),
('taco'),
('taco'),
('taco'),
('taco'),
('taco'),
('taco'),
('Tactical'),
('Hack ''n'' Slash/Beat ''em Up'),
('Quiz/Trivia'),
('taco'),
('taco'),
('taco'),
('Pinball'),
('Adventure'),
('Indie'),
('Arcade'),
('Visual Novel');