\echo 'Delete and recreate quote bot db?'
\prompt 'Return for yes or CTRL-C to cancel > '

DROP DATABASE quote_bot_data;
CREATE DATABASE quote_bot_data;
\connect quote_bot_data

\i create-tables.sql
\i seed-tables.sql
