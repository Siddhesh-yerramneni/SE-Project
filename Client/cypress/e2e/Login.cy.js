// Cypress tests for Login page with real backend API calls
describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/login");
    });
  
    // Login page display test
    it("should display the login form", () => {
      cy.get("input[name='username']").should("exist");
      cy.get("input[name='password']").should("exist");
      cy.get("button[type='submit']").should("exist");
    });
  
    // Login fields update tets
    it("should allow user to type in username and password", () => {
      cy.get("input[name='username']").type("testuser");
      cy.get("input[name='password']").type("password123");
  
      cy.get("input[name='username']").should("have.value", "testuser");
      cy.get("input[name='password']").should("have.value", "password123");
    });
  
    // Invalid login test (WHen invalid username or password entered)
    it("should display an error message for invalid login", () => {
      cy.get("input[name='username']").type("wronguser");
      cy.get("input[name='password']").type("wrongpassword");
      cy.get("button[type='submit']").click();
    
      cy.contains("Invalid username or password").should("be.visible");
    });
    
    // Successful login scenario
    it("should log in successfully with valid credentials", () => {
      cy.get("input[name='username']").type("test1");
      cy.get("input[name='password']").type("test1");
      cy.get("button[type='submit']").click();
    
      cy.contains("Login successful").should("be.visible");
    
      // Ensure user is redirected to home page after login
      cy.url().should("eq", "http://localhost:5173/");
    });
    
  });
  