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
