-- \echo 'Delete and recreate  db?' rental
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE rental;
-- CREATE DATABASE rental;
-- \connect rental

-- \i rental-schema.sql
-- \i rental-seed.sql

\echo 'Delete and recreate rental_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE rental_test;
CREATE DATABASE rental_test;
\connect rental_test

\i rental-schema.sql
