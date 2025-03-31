# API Doucmentation for the 3rd sprint developed API calls

## POST /signup
This endpoint allows new users to create an account. It accepts a JSON request containing user details and securely hashes the password before storing it in the database. If the registration is successful, it returns a 201 Created response with the user's information (excluding the password). If the request body is invalid or an error occurs during registration, appropriate error messages are returned.

Request Example:
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}

Response Example (Success - 201 Created):

{
  "statusText": "OK",
  "msg": "User registered successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "name": "John Doe"
  }
}

Response Example (Error - 400 Bad Request):

{
  "statusText": "Bad Request",
  "msg": "Invalid request body"
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error creating user",
  "error": "Database error details"
}

## POST /login
This endpoint allows registered users to log in. It validates the provided credentials against the database. If the username and password match, the server returns a 200 OK response with the user's details. If authentication fails, a 401 Unauthorized response is sent. Any database-related errors result in a 500 Internal Server Error.

Request Example:

{
  "username": "johndoe",
  "password": "securepassword123"
}

Response Example (Success - 200 OK):

{
  "statusText": "OK",
  "msg": "Login successful!",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "name": "John Doe"
  }
}

Response Example (Error - 401 Unauthorized, Incorrect Credentials):

{
  "statusText": "Unauthorized",
  "msg": "Invalid username or password"
}

Response Example (Error - 400 Bad Request, Invalid Request Body):

{
  "statusText": "Bad Request",
  "msg": "Invalid request body"
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Database error"
}

Security Considerations:
Passwords are securely hashed using bcrypt before storage.

Users must provide correct credentials to authenticate.

Responses do not expose sensitive user data like hashed passwords.

Proper error handling prevents revealing sensitive database information.



## POST /addBook
This endpoint allows users to add a new book to the database. The request must contain the book's name and author in JSON format. If successful, it returns a `201 Created` response with the added book's details. Errors related to request parsing or database operations return appropriate error messages.

Request Example:

{
  "bookname": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}

Response Example (Success - 201 Created)

{
  "statusText": "OK",
  "msg": "Book added successfully!",
  "book": {
    "id": 1,
    "bookname": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}

esponse Example (Error - 400 Bad Request):

{
  "statusText": "Bad Request",
  "msg": "Invalid request body"
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error adding book",
  "error": "Database error details"
}




## DELETE /deleteBook/:id
This endpoint deletes a book from the database based on the provided `id`. If the book is found and deleted, a `200 OK` response is returned. If the book is not found, a `404 Not Found` response is sent.

Response Example (Success - 200 OK):

{
  "statusText": "OK",
  "msg": "Book deleted successfully"
}

Response Example (Error - 404 Not Found, Book Doesn't Exist):

{
  "statusText": "Not Found",
  "msg": "Book not found"
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error deleting book",
  "error": "Database error details"
}

## GET /getBook/:id
Fetches details of a single book using its `id`. If found, returns a `200 OK` response with the book details. If the book does not exist, a `404 Not Found` response is sent.


Response Example (Success - 200 OK):

{
  "statusText": "OK",
  "book": {
    "id": 1,
    "bookname": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}

Response Example (Error - 404 Not Found):
{
  "statusText": "Not Found",
  "msg": "Book not found"
}

## GET /getBooks
Retrieves all books from the database. If successful, returns a `200 OK` response containing an array of books.

Response Example (Success - 200 OK):

{
  "statusText": "OK",
  "books": [
    {
      "id": 1,
      "bookname": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    },
    {
      "id": 2,
      "bookname": "To Kill a Mockingbird",
      "author": "Harper Lee"
    }
  ]
}

{
  "statusText": "Internal Server Error",
  "msg": "Error fetching books",
  "error": "Database error details"
}


Security Considerations
- Ensure proper request validation to prevent SQL injections or malformed data.
- Implement authentication and authorization checks if needed.
- Secure database connections to prevent unauthorized access.

## GET /getBooks/fiction
This endpoint retrieves all books categorized as "Fiction" from the database. When a request is made, the server queries the database to find books where the category is set to "fiction". The response includes a status code of 200 OK with a JSON payload containing the list of fiction books. If an error occurs during the query, the API returns a 500 Internal Server Error with an error message explaining the issue. This endpoint is useful for users who want to browse fiction books specifically.
Response : Successs
{
  "statusText": "OK",
  "msg": "Fiction books retrieved successfully!",
  "books": [ /* Array of fiction books */ ]
}

Response Example (Error - 500 Internal Server Error):
{
  "statusText": "Internal Server Error",
  "msg": "Error fetching books",
  "error": "Database query error details"
}

## GET /getBooks/selfhelp
This endpoint fetches books categorized as "Self-Help" from the database. The query ensures a case-insensitive match, allowing for flexibility in category formatting. The server responds with a 200 OK status and a JSON object containing the retrieved books. If an issue arises, such as a database connection failure, the API returns a 500 Internal Server Error along with an error message. This route is beneficial for users looking for self-improvement, motivational, or guidance books.

Response Example (Success - 200 OK):
{
  "statusText": "OK",
  "msg": "Self-Help books retrieved successfully!",
  "books": [ /* Array of self-help books */ ]
}

Response Example (Error - 500 Internal Server Error):
{
  "statusText": "Internal Server Error",
  "msg": "Error fetching Self-Help books",
  "error": "Database query error details"
}


## GET /getBooks/romance
This endpoint retrieves all books that fall under the "Romance" category. Like the self-help endpoint, it uses a case-insensitive search to ensure that variations in capitalization do not affect the query results. The API returns a 200 OK response with a JSON object listing the romance books available. If an error occurs during the query, such as database connection issues, the API responds with a 500 Internal Server Error. This route is designed for users interested in romantic novels and related genres.

Response Example (Success - 200 OK):
{
  "statusText": "OK",
  "msg": "Romantic books retrieved successfully!",
  "books": [ /* Array of romance books */ ]
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error fetching Romance books",
  "error": "Database query error details"
}

## POST /addReview
This endpoint allows users to submit a new review for a book. The request must contain a JSON body with the review details. Upon receiving the request, the server parses the JSON data and stores the review in the database. If the operation is successful, the API returns a 201 Created response with the newly added review. If there is an error in the request format or database operation, appropriate error messages with 400 Bad Request or 500 Internal Server Error are returned.

Request Example:

{
  "user_id": 1,
  "book_id": 5,
  "review": "An insightful and well-written book."
}

Response Example (Success - 201 Created):

{
  "statusText": "OK",
  "msg": "Review added successfully!",
  "review": { /* Newly added review object */ }
}

Response Example (Error - 400 Bad Request):

{
  "statusText": "Bad Request",
  "msg": "Invalid request body"
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error adding review",
  "error": "Database error details"
}

## GET /getReviews/:bookID
This endpoint retrieves all reviews for a specific book based on its bookID. The server queries the database for reviews associated with the given book and includes user and book details in the response. If reviews are found, the API responds with 200 OK and an array of reviews. If an error occurs, a 500 Internal Server Error is returned.

Response Example (Success - 200 OK):

{
  "statusText": "OK",
  "reviews": [ /* Array of reviews for the book */ ]
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error fetching reviews",
  "error": "Database query error details"
}

## DELETE /deleteReview/:id
This endpoint allows users to delete a review using its unique id. The server first checks if the review exists before attempting deletion. If the review is successfully deleted, the API returns 200 OK. If the review does not exist, a 404 Not Found response is sent. Errors related to ID formatting result in a 400 Bad Request, while database-related issues return a 500 Internal Server Error.

Response Example (Success - 200 OK):

{
  "statusText": "OK",
  "msg": "Review deleted successfully"
}

Response Example (Error - 400 Bad Request):

{
  "statusText": "Bad Request",
  "msg": "Invalid ID format"
}

Response Example (Error - 404 Not Found):

{
  "statusText": "Not Found",
  "msg": "Review not found"
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error deleting review",
  "error": "Database error details"
}

## PUT /editReview/:id
This endpoint allows users to edit the content of an existing review by specifying its id. The request body should contain a new review text. The server first verifies if the review exists, then updates the review text in the database. Upon successful update, a 200 OK response is returned. If the review is not found, the API responds with 404 Not Found, and if the request body is invalid, it returns 400 Bad Request. Any database-related issues result in a 500 Internal Server Error.

Request Example:

{
  "review": "This book was truly inspiring and changed my perspective."
}

Response Example (Success - 200 OK):

{
  "statusText": "OK",
  "msg": "Review updated successfully!",
  "review": { /* Updated review object */ }
}

Response Example (Error - 400 Bad Request):

{
  "statusText": "Bad Request",
  "msg": "Invalid request body"
}

Response Example (Error - 404 Not Found):

{
  "statusText": "Not Found",
  "msg": "Review not found"
}

Response Example (Error - 500 Internal Server Error):

{
  "statusText": "Internal Server Error",
  "msg": "Error updating review",
  "error": "Database error details"
}