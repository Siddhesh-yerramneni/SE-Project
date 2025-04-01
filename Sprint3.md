# Sprint - 3 Front End Enhancements

## Overview
This sprint introduced significant improvements in the front end, focusing on enhancing the review functionality, restructuring the codebase for better reusability, and integrating centralized state management. These updates set the stage for upcoming features that will further improve user experience and code maintainability.

## New Features

### Review Book Section
- **Add, Update & Delete Reviews:** Logged-in users can now add reviews for existing books. They can also update or delete their own reviews.
- **Public Viewing:** All users can view reviews added by different members.
- **User-Specific Actions:** If logged in with the same ID as the review author, users are empowered to modify or remove their reviews.

### Backend Integration & Testing
- **API Integration:** Seamlessly integrated with backend APIs to support review functionalities.
- **Testing:** Conducted thorough unit testing and end-to-end testing to ensure the reliability of the new features.

### UI Enhancements & Navigation
- **Book Categories:** Added categories for books to streamline browsing.
- **UI Alignment:** Adjusted the user interface for improved visual consistency and user experience.

### State Management
- **Redux Integration:** Implemented Redux for centralized state management. This setup will be particularly beneficial for handling extensive user data in upcoming feature implementations.

## Code Refactoring & Componentization
- **Decoupling Components:** Broke down tightly coupled code into loosely coupled, reusable components.
- **Enhanced Maintainability:** This modular approach improves the overall maintainability of the application and prepares the codebase for future enhancements.

## Upcoming Enhancements

- **User Role Differentiation:**
  - Implement clear differentiation between reader and author accounts.
- **Access Restrictions:**
  - Restrict the ability to add books exclusively to users with author accounts.
- **Section-Wise Book Fetching:**
  - Develop an end-to-end feature for fetching books by sections.
- **Further Code Optimization:**
  - Refactor code to eliminate hardcoded values and improve overall code quality.

## Conclusion
The sprint has paved the way for a more scalable and maintainable front end, with robust testing and a cleaner code structure. The planned enhancements will further enrich user interactions and streamline content management in future releases.

# Frontend Unit Tests Documentation – Review Feature

##  `ReviewForm.test.jsx`

### 1. **Renders form in add mode**
- **Purpose**: Ensure the component displays textarea and submit button for new reviews.
- **Setup**: Rendered with `existingReview = null`.
- **Execution**: Render the component.
- **Assertions**:
  - Textarea with placeholder `Write your review...` should be present.
  - Button labeled `Submit Review` should exist.
- **Expected Outcome**: Correct UI for add review mode.

---

### 2. **Submits a new review**
- **Purpose**: Validate that `addReview()` API is called with correct data.
- **Setup**: Mock `addReview`, simulate user input and submit.
- **Execution**: Type a new review and click submit.
- **Assertions**:
  - `api.addReview()` is called with correct payload.
  - `refreshReviews()` is triggered.
- **Expected Outcome**: API integration and UI callback work properly.

---

### 3. **Renders form in edit mode**
- **Purpose**: Validate conditional UI for editing a review.
- **Setup**: Pass `existingReview={{ id: 5, review: "Old Review" }}`.
- **Execution**: Render the form.
- **Assertions**:
  - Textarea should contain "Old Review".
  - Button text should be `Update Review`.
- **Expected Outcome**: Displays correctly in edit mode.

---

### 4. **Submits updated review**
- **Purpose**: Ensure `editReview()` is called with updated data.
- **Setup**: Mock `editReview`, simulate text change and update click.
- **Execution**: Change review text and click `Update Review`.
- **Assertions**:
  - `api.editReview()` called with updated review.
  - `refreshReviews()` triggered.
- **Expected Outcome**: Review is updated and reflected in UI.

---

## `ReviewList.test.jsx`

### 1. **Renders all reviews**
- **Purpose**: Ensure multiple reviews are rendered for a book.
- **Setup**: `getReviews` mock returns multiple reviews.
- **Execution**: Render `ReviewList` with `bookId=1`.
- **Assertions**:
  - Text from all mock reviews should be visible.
- **Expected Outcome**: Full review list is displayed.

---

### 2. **Shows Edit/Delete for current user**
- **Purpose**: Restrict review actions to the owner.
- **Setup**: Mock reviews with mixed user_ids.
- **Execution**: Render with `currentUserId=1`.
- **Assertions**:
  - "Edit" and "Delete" appear only for `user_id: 1`.
- **Expected Outcome**: Proper access control for actions.

---

### 3. **Enters edit mode on Edit click**
- **Purpose**: Clicking edit activates editable state.
- **Execution**: Click "Edit" on user’s review.
- **Assertions**:
  - Editable input field is shown.
  - Label `Editing your review...` appears.
- **Expected Outcome**: Edit mode is triggered in UI.

---

### 4. **Deletes a review**
- **Purpose**: Ensure delete button triggers `deleteReview()` call.
- **Setup**: Mock API and confirm delete call.
- **Execution**: Click "Delete" on review.
- **Assertions**:
  - `api.deleteReview(id)` is called.
- **Expected Outcome**: Review is removed and list updates.

---

##  `ViewBook.test.jsx`

### 1. **Shows loading text initially**
- **Purpose**: Display loading message during data fetch.
- **Execution**: Render component without data.
- **Assertions**:
  - "Loading book..." is shown initially.
- **Expected Outcome**: UI handles loading state.

---

### 2. **Renders book details and review section**
- **Purpose**: Ensure book data and `ReviewList` are rendered correctly.
- **Setup**: Mock book API response and mock `ReviewList` component.
- **Execution**: Render page, wait for API resolution.
- **Assertions**:
  - Book title, author, price, and category are visible.
  - `ReviewList` is rendered.
- **Expected Outcome**: Complete book view page loads with review section.

---

📘 **Note**: All tests are written using **Vitest + React Testing Library**, and APIs are mocked from the shared `api.js` service.




# Backend

## `Tests`
##  `booksController_test.go`

### 1. `TestHomePage`

- **Purpose**:  
  To verify that the home API route (`"/"`) is correctly configured and responds with expected JSON and HTTP status.

- **Setup**:  
  Fiber app instance is initialized with a route `/` returning JSON.

- **Execution**:  
  A GET request is made to `/`.

- **Assertions**:  
  - Response status should be `200`.
  - Response body must contain `"Home Page api route"`.

- **Expected Outcome**:  
  Confirms that the root route works and returns the correct status/message.

---

### 2. `TestAddBook`

- **Purpose**:  
  To test adding a new book via POST request to `/addbook`.

- **Setup**:  
  - A mock book JSON is prepared.
  - An in-memory test DB is initialized via `setupTestDB()`.

- **Execution**:  
  POST request is sent with JSON payload to `/addbook`. Request handler parses body and creates the book in DB.

- **Assertions**:  
  - Response status must be `201`.
  - Response JSON must include `"status":"success"` and the correct `bookname`.

- **Expected Outcome**:  
  Verifies that the `AddBook` route correctly accepts, parses, stores, and responds with the created book.

---

### 3. `TestDeleteBook`

- **Purpose**:  
  To test if a book can be deleted successfully via its ID.

- **Setup**:  
  - A mock book is created and saved in the test DB.
  - Fiber route `/deletebook/:id` is set up.

- **Execution**:  
  DELETE request is sent to `/deletebook/<book_id>`.

- **Assertions**:  
  - Response status must be `200`.
  - Response body must include `"Book deleted successfully"`.

- **Expected Outcome**:  
  Ensures that the system can delete a book from the database by ID.

---

### 4. `TestGetBook`

- **Purpose**:  
  To fetch and return a specific book based on its ID.

- **Setup**:  
  - A mock book is added to the DB.
  - Route `/getbook/:id` is defined.

- **Execution**:  
  GET request is sent to `/getbook/<book_id>`.

- **Assertions**:  
  - Status code should be `200`.
  - Response body should contain the book’s name (e.g., `"Go Programming"`).

- **Expected Outcome**:  
  Confirms that a valid book ID returns the correct book object.

---

### 5. `TestGetBooks`

- **Purpose**:  
  To test retrieving all books from the database.

- **Setup**:  
  One mock book is inserted.

- **Execution**:  
  GET request is sent to `/getbooks`.

- **Assertions**:  
  - Status code should be `200`.
  - The response must contain the inserted book details.

- **Expected Outcome**:  
  Verifies that the endpoint correctly returns a list of books.

---

##  `reviewsController_test.go`

### 1. `TestAddReview`

- **Purpose**:  
  To test creation of a new review for a book.

- **Setup**:  
  - In-memory DB initialized with `Review`, `User`, and `Book` tables.
  - Mock review JSON is prepared.

- **Execution**:  
  POST request to `/reviews` is sent. The review is parsed and saved.

- **Assertions**:  
  - Response status must be `201`.
  - Body includes a success status and saved review.

- **Expected Outcome**:  
  Ensures that reviews are properly created and stored.

---

### 2. `TestGetReviews`

- **Purpose**:  
  To fetch all reviews for a particular book.

- **Setup**:  
  A review is manually inserted into the DB for `book_id=1`.

- **Execution**:  
  GET request is sent to `/reviews/1`.

- **Assertions**:  
  - Status code must be `200`.
  - Returned list should contain the correct review.

- **Expected Outcome**:  
  Verifies that reviews can be retrieved by `book_id`.

---

### 3. `TestDeleteReview`

- **Purpose**:  
  To delete a review by its ID.

- **Setup**:  
  - A review is inserted into the DB.
  - DELETE route `/reviews/:id` is defined.

- **Execution**:  
  DELETE request to `/reviews/1` is sent.

- **Assertions**:  
  - Status code should be `200`.
  - Response must contain `"Review deleted"`.

- **Expected Outcome**:  
  Validates that reviews can be successfully deleted.

---

### 4. `TestEditReview`

- **Purpose**:  
  To update the content of an existing review.

- **Setup**:  
  - A review is created and stored.
  - PUT route `/reviews/:id` is defined to update review text.

- **Execution**:  
  PUT request with updated review JSON is sent.

- **Assertions**:  
  - Status should be `200`.
  - Response should include confirmation and updated text.

- **Expected Outcome**:  
  Ensures that review edits are applied and persisted correctly.

---

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