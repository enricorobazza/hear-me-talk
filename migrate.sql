drop database if exists hearmetalk;
create database hearmetalk;

\c hearmetalk;
create table times(
    id serial,
    username varchar(50),
    delay float,
    primary key(id)
);