describe("Signup Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/signup");
    });
  
    // Form display test
    it("should display the signup form", () => {
      cy.get("input[name='email']").should("exist");
      cy.get("input[name='username']").should("exist");
      cy.get("input[name='password']").should("exist");
      cy.get("button[type='submit']").should("exist");
    });
  
    // Update fields test
    it("should allow user to type in email, username, and password", () => {
      cy.get("input[name='email']").type("test@example.com");
      cy.get("input[name='username']").type("testuser");
      cy.get("input[name='password']").type("password123");
  
      cy.get("input[name='email']").should("have.value", "test@example.com");
      cy.get("input[name='username']").should("have.value", "testuser");
      cy.get("input[name='password']").should("have.value", "password123");
    });
  
    // Signup Successful scenario
    it("should handle successful signup with real API", () => {
        cy.get("input[name='email']").type("cypresstest@example.com");
        cy.get("input[name='username']").type("cypresstest");
        cy.get("input[name='password']").type("cypresstest");
        cy.get("button[type='submit']").click();
      
        cy.contains("User registered successfully").should("be.visible");
        cy.url().should("eq", "http://localhost:5173/login");
      });
      
      // Scenario where user already exist
      it("should show error message for duplicate user signup", () => {
        cy.get("input[name='email']").type("existinguser@example.com");
        cy.get("input[name='username']").type("existinguser");
        cy.get("input[name='password']").type("password123");
        cy.get("button[type='submit']").click();
      
        cy.contains("Error creating user").should("be.visible");
      });
      
  });
  