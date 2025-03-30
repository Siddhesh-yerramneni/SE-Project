# **Sprint 2 Progress Report**

## **Sprint 2 Frontend Objectives**
During Sprint 2, the frontend team focused on:
- **Integrating frontend with the backend** to enable user authentication and registration.
- **Writing unit tests using Vitest** to validate individual components.
- **Writing Cypress end-to-end (E2E) tests** to ensure complete user flow functionality.
- **Fixing CORS issues** and ensuring smooth communication between frontend and backend.
- **Debugging issues in API requests, routing, and testing workflows.**

---

## **1️. Completed Work in Sprint 2**

### **Frontend Tasks Completed**
- Connected **Login and Signup pages** with the backend API.
- Connected **Home and Add Book pages** with the backend API.
- Resolved **CORS issues** in backend Go Fiber configuration.
- Added **Profile** and **Add Book** pagew in the Frontend.
- Created **unit tests** using **Vitest & React Testing Library**.
- Created **Cypress E2E tests** for **login and signup workflows**.
- Created **Cypress E2E tests** for **Home and Add Book workflows**.
- Ensured **successful redirection after authentication**.
- Verified **full functionality of the Home page and Add Book feature.**

### **Testing Tools Used**
- **Vitest** for Unit Testing
- **React Testing Library** for Component Testing
- **Cypress** for End-to-End Testing

---

## **2️. Unit Tests (Vitest)**

### **Unit Test for Login Component**
**Test File:** `tests/unit/Login.test.jsx`

#### **Tests Implemented:**
- Renders login form correctly.
- Updates input fields on change.
- Handles successful login with a real API call.
- Displays an error for invalid login.

### **Unit Test for Signup Component**
**Test File:** `tests/unit/Signup.test.jsx`

#### **Tests Implemented:**
- Renders signup form correctly.
- Updates input fields on change.
- Handles successful signup with a real API call.
- Displays an error for duplicate signup.

### **Unit Test for Home Component**
**Test File:** `tests/unit/Home.test.jsx`

#### **Tests Implemented:**
- Renders the hero section with correct text.
- Displays the "Browse Books" button.
- Displays featured categories like Fiction, Non-Fiction, and Science Fiction.
- Navigates to the AllBooks page when clicking the "Browse Books" button.

### **Unit Test for AddBook Component**
#### **Test File:** `tests/unit/AddBook.test.jsx`

Tests Implemented:
- Renders the Add Book form with all required fields.
- Updates form input fields on change.
- Ensures correct data types are captured (especially for numeric fields like price).
- Validates form submission flow (mocking API call).
- Displays success and error messages based on the submission result.
---

## **3️. Cypress End-to-End (E2E) Tests**

### **Cypress Test for Login Flow**
**Test File:** `cypress/e2e/login.cy.js`

#### **Tests Implemented:**
- Renders login form correctly.
- Allows user input.
- Handles successful login with a real API call.
- Displays an error for invalid login.

### **Cypress Test for Signup Flow**
**Test File:** `cypress/e2e/signup.cy.js`

#### **Tests Implemented:**
- Renders signup form correctly.
- Allows user input.
- Handles successful signup with a real API call.
- Displays an error for duplicate signup.

### **Cypress Test for Home Page**
**Test File:** `cypress/e2e/Home.cy.js`

#### **Tests Implemented:**
- Renders the home page hero section correctly.
- Navigates to the AllBooks page when "Browse Books" button is clicked.
- Displays featured categories such as Fiction, Non-Fiction, and Science Fiction.

### **Cypress Test for AddBook Page**
**Test File:** `cypress/e2e/AddBook.cy.js`

#### **Tests Implemented:**
- Renders the Add Book form with all required fields.
- Allows user input into all form fields.
- Submits the form and handles successful book addition with a real API call.
- Confirms redirection to the AllBooks page after successful submission.
- Displays an error message if submission fails.

---

## **4️. Conclusion**
During **Sprint 2**, the frontend team successfully:
- **Implemented real API integration** in both unit and E2E tests.
- **Debugged and resolved key issues related to API calls and routing.**
- **Created comprehensive tests covering all authentication workflows.**


