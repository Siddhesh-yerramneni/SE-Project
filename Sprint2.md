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
- Resolved **CORS issues** in backend Go Fiber configuration.
- Created **unit tests** using **Vitest & React Testing Library**.
- Created **Cypress E2E tests** for **login and signup workflows**.
- Ensured **successful redirection after authentication**.

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

---

## **4️. Conclusion**
During **Sprint 2**, the frontend team successfully:
- **Implemented real API integration** in both unit and E2E tests.
- **Debugged and resolved key issues related to API calls and routing.**
- **Created comprehensive tests covering all authentication workflows.**


