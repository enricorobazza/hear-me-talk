drop database if exists hearmetalk;
create database hearmetalk;

\c hearmetalk;
create table times(
    id serial,
    username varchar(50),
    listenTo varchar(50),
    delay float,
    primary key(id)
);

-- select username, listento, avg(delay) from times group by(username, listento) order by(listento, username, avg(delay));