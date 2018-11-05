drop database if exists social_storydb;
create database social_storydb;

CREATE TABLE users(
    id AUTO_INCREMENT INT,
    name VARCHAR(225),
    followed VARCHAR,
    posts VARCHAR,
    comments VARCHAR,
    PRIMARY KEY id
)
