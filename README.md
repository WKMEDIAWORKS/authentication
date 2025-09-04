This project demonstrates a basic authentication system built with Node.js, Express, PostgreSQL, and bcrypt.

Setup Instructions:

- Clone or fork the repository to your local machine.
- Install dependencies by running:
. npm install
. This will install all required packages, including:
. express – for server routing
. body-parser – for parsing request bodies
. pg – for PostgreSQL database connection
. bcrypt – for password hashing
- Database Setup
. A .sql file is included in this repository containing the SQL commands to create a users table with the required columns and data types.
Execute this file in your PostgreSQL database to set up the necessary schema.
- Run the server
node index.js
or, if using nodemon:
nodemon index.js
