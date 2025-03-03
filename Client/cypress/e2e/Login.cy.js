describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/login"); // ✅ Visit the login page before each test
    });
  
    it("should display the login form", () => {
      cy.get("input[name='username']").should("exist");
      cy.get("input[name='password']").should("exist");
      cy.get("button[type='submit']").should("exist");
    });
  
    it("should allow user to type in username and password", () => {
      cy.get("input[name='username']").type("testuser");
      cy.get("input[name='password']").type("password123");
  
      cy.get("input[name='username']").should("have.value", "testuser");
      cy.get("input[name='password']").should("have.value", "password123");
    });
  
    it("should display an error message for invalid login", () => {
      cy.get("input[name='username']").type("wronguser");
      cy.get("input[name='password']").type("wrongpassword");
      cy.get("button[type='submit']").click();
  
      cy.contains("Invalid username or password").should("be.visible");
    });
  
    it("should log in successfully with valid credentials", () => {
      cy.intercept("POST", "http://localhost:3000/api/login", {
        statusCode: 200,
        body: { msg: "Login successful" },
      }).as("loginRequest");
  
      cy.get("input[name='username']").type("test1");
      cy.get("input[name='password']").type("test1");
      cy.get("button[type='submit']").click();
  
      cy.wait("@loginRequest");
      cy.contains("Login successful").should("be.visible");
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
  