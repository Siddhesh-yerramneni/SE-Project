### **Sprint 4**

- **Post Feature Implementation**
  - Developed full CRUD functionality for posts:
    - `CreatePost`, `AllPosts`, `EditPost`, and `DeletePost` components integrated with API.
    - Applied form validation (required fields) and error handling.
  - **Unit Testing for Post Feature**
    - Wrote Vitest/React Testing Library tests to cover:
      - Rendering of components.
      - API call mocks and form submission behavior.
  - **Cypress E2E Testing for Post Feature**
    - Automated end-to-end flows:
      - Create a post and verify its appearance.
      - Edit a post and confirm updates.
      - Delete a post and ensure removal from the list.

- **Review Feature Cypress Testing Completion**
  - The Review module was implemented in Sprint 3 without Cypress tests.
  - Completed Cypress end-to-end tests for Review feature in this sprint:
    - Seeded a review via UI and asserted visibility.
    - Deleted the review and confirmed removal.
    - Validated API intercepts for review create/delete calls.

Frontend unit and Cypress tests

- **Frontend Unit Tests**
  - **AllPosts**
    - Verified rendering of the post list and heading.
    - Mocked `fetchPosts` API calls and asserted it runs on component mount.
  - **CreatePost**
    - Simulated user input in title and content fields.
    - Asserted API submission and redirection behavior on successful post creation.
  - **EditPost**
    - Mocked fetching existing post data.
    - Ensured form fields are pre-populated and update submission triggers the correct API call.
  - **DeletePost**
    - Verified confirmation prompt appears.
    - Asserted the delete callback is invoked and the list refreshes after deletion.

- **Cypress End-to-End Tests**
  - **Login Flow (`login.cy.js`)**
    - Intercepted login API request.
    - Validated navigation to `/allPosts` upon successful authentication.
  - **Posts Module (`posts.cy.js`)**
    - Logged in via UI before each test.
    - **Display**: Confirmed the “All Posts” page shows existing posts.
    - **Create**: Filled and submitted the new post form; verified post appears on the list.
    - **Update**: Navigated to the edit page for a specific post, updated fields, and confirmed changes.
    - **Delete**: Performed deletion and confirmed the post is removed from the list.
  - **Review Module (`review.cy.js`)**
    - **Seed Review**: Created a new review via the UI and asserted its visibility.
    - **Delete Review**: Deleted the seeded review and asserted it no longer appears.

### **Test Functions- postsController_test.go**

#### **1. `TestCreatePost`**

- **Purpose**: Test the `CreatePost` controller function, which creates a new post.
- **Test Action**: This test simulates a `POST` request to the `/createPost` route with JSON data representing a new post.
- **Expected Output**: 
  - A `201` status code is returned, indicating that the post has been successfully created.
  - The response should contain the status `"success"` and the `"title"` of the post (`"Go Programming"` in this case).
  
- **Test Flow**:
  1. A mock post data is sent in the request body.
  2. The post is created in the in-memory database.
  3. The response body is validated to ensure it contains the `"status": "success"` and the `"title": "Go Programming"`.


#### **2. `TestDeletePost`**

- **Purpose**: Test the `DeletePost` controller function, which deletes a post by its ID.
- **Test Action**: This test simulates a `DELETE` request to the `/deletePost/:id` route with the post ID to be deleted.
- **Expected Output**: 
  - A `200` status code is returned, indicating that the post has been successfully deleted.
  - The response should contain the message `"Post deleted successfully"`.

- **Test Flow**:
  1. A mock post is first created in the database.
  2. A `DELETE` request is sent to delete the post by its ID.
  3. The response body is validated to ensure it contains the message `"Post deleted successfully"`.


#### **3. `TestGetAllPosts`**

- **Purpose**: Test the `GetAllPosts` controller function, which retrieves all posts from the database.
- **Test Action**: This test simulates a `GET` request to the `/getPosts` route.
- **Expected Output**: 
  - A `200` status code is returned, indicating successful retrieval of the posts.
  - The response should contain the title of the created post, `"Go Programming"`.

- **Test Flow**:
  1. A mock post is first created in the database.
  2. A `GET` request is sent to retrieve all posts.
  3. The response body is validated to ensure it contains the title `"Go Programming"`.


#### **4. `TestGetPostsByAuthorID`**

- **Purpose**: Test the `GetPostsByAuthorID` controller function, which retrieves all posts for a specific author based on their author ID.
- **Test Action**: This test simulates a `GET` request to the `/getPosts/:authorID` route with a valid author ID.
- **Expected Output**: 
  - A `200` status code is returned, indicating successful retrieval of the posts.
  - The response should contain the title of the created post, `"Go Programming"`, and be linked to the correct author.

- **Test Flow**:
  1. A mock post is created and linked to an author.
  2. A `GET` request is sent to retrieve posts for the author using the author's ID.
  3. The response body is validated to ensure it contains the title `"Go Programming"`.


#### **5. `TestEditPost`**

- **Purpose**: Test the `EditPost` controller function, which updates an existing post's title and content.
- **Test Action**: This test simulates a `PUT` request to the `/editPost/:id` route with the updated post data.
- **Expected Output**: 
  - A `200` status code is returned, indicating that the post has been successfully updated.
  - The response should contain the message `"Post updated successfully"` and the new post title (`"Advanced Go Programming"`).
  
- **Test Flow**:
  1. A mock post is created.
  2. A `PUT` request is sent with updated post data (new title and content).
  3. The response body is validated to ensure it contains the updated title and the success message.

### **Running the Tests:**

1. **Ensure all dependencies are correctly installed**. In the `Server` directory, run:
   ```bash
   go mod tidy
   ```

2. **Run the tests**:
   ```bash
   go test -v ./tests
   ```