This project create a user management system. It can get random user data from https://api.api-ninjas.com/v1/randomuser by javascript axios library. The functions include:
1. Before getting the data, show "Loading... Please wait!"
2. Show the user data including username, sex, address, name, email and birthday in a table
3. Use "Add User" button to add one line of user information
4. Use "delete" button to delete one line of user information
5. Use search input to search information with names startswith some alphabet

===========================================================================
The progress of this project is as follows:

1. npm init (a command used in Node.js to create a package.json file.This file is used to manage the dependencies and configurations of a Node.js project.)
2. create 3 files: index.html, index.css, index.js
3. npm install axios --save (install axios library)
4. Create a Basic HTML template in index.html
5. Create a input for search
6. Create a div for table
7. Import <script src="index.js"></script>
8. Create the main(), which do these things: render loading screen, render table, init Search input event listener, and init addUser button click event listener
9. Added loading animation
10. Register account at ninjas.com
11. Get the TOKEN
12. Use axios (Promise) to get the data from ninjas.com server
13. import <script src="./node_modules/axios/dist/axios.min.js"></script> in HTML
14. Once you get the table now you can use the data to create the table

==========================================================================
The core techniques in this project are node.js and axios js library

Axios is a popular JavaScript library used for making HTTP requests in Node.js and web applications. It provides a simple and intuitive API for sending HTTP requests and interacting with web servers. Axios is often used as an alternative to the native XMLHttpRequest object or the fetch API.
