User Stories for Book Management API
1. View Home Page
As a user,
I want to access the home page of the API,
So that I can verify that the API is running and accessible.
Acceptance Criteria:
When I send a GET request to /, I should receive a response with "statusText": "OK" and a message confirming the API is operational.

2. Add a New Book
As a user,
I want to add a new book to the system,
So that I can store book information such as title and author in the database.
Acceptance Criteria:
When I send a POST request to /books with valid JSON data, the book should be added to the database.
If the request is valid, I should receive a 201 Created response with the book details.
If the request body is invalid, I should receive a 400 Bad Request response with an appropriate error message.

3. Get a Book by ID
As a user,
I want to retrieve the details of a specific book using its ID,
So that I can view its information.
Acceptance Criteria:
When I send a GET request to /books/:id, the API should return the book details.
If the book exists, I should receive a 200 OK response with the book data.
If the book does not exist, I should receive a 404 Not Found response.

4. Get All Books
As a user,
I want to fetch a list of all books in the system,
So that I can browse available books.
Acceptance Criteria:
When I send a GET request to /books, the API should return a list of all stored books.
If books exist, I should receive a 200 OK response with the book list.
If an error occurs while fetching the data, I should receive a 500 Internal Server Error response.

5. Delete a Book by ID
As a user,
I want to delete a book from the system using its ID,
So that I can remove books that are no longer needed.
Acceptance Criteria:
When I send a DELETE request to /books/:id, the book should be removed from the database.
If the book exists, I should receive a 200 OK response confirming deletion.
If the book does not exist, I should receive a 404 Not Found response.
If an error occurs during deletion, I should receive a 500 Internal Server Error response.


The issues we planned to address mainly revolved around the Go lang. We decided to come up with the requirements and developed those. Planned to seperate the admin, author and users but did not able to finish.  The project codebase setup using MVC architecture was succesfully implement and front end-back end was integrated succesfully.
We faced some problems with the GORM, which are mostly in the backend data communication to the database. In the frontend, planned to implement the state management but the team is yet to decide about the usage of redux as it may lead to the delayed loading of the pages.
