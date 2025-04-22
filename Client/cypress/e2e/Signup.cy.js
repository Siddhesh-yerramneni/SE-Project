describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
  });

  // Utility function to generate a unique email and username
  const generateUniqueCredentials = () => {
    const timestamp = Date.now();
    return {
      email: `user${timestamp}@example.com`,
      username: `user${timestamp}`,
      password: "TestPassword123!"
    };
  };

  it("should display the signup form", () => {
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='username']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  it("should allow user to type in email, username, and password", () => {
    const { email, username, password } = generateUniqueCredentials();

    cy.get("input[name='email']").type(email);
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);

    cy.get("input[name='email']").should("have.value", email);
    cy.get("input[name='username']").should("have.value", username);
    cy.get("input[name='password']").should("have.value", password);
  });

  it("should handle successful signup with real API", () => {
    const { email, username, password } = generateUniqueCredentials();

    cy.get("input[name='email']").type(email);
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();

    cy.contains("User registered successfully").should("be.visible");
    cy.url().should("eq", "http://localhost:5173/login");
  });

  it("should show error message for duplicate user signup", () => {
    // Use known existing credentials for this test
    cy.get("input[name='email']").type("existinguser@example.com");
    cy.get("input[name='username']").type("existinguser");
    cy.get("input[name='password']").type("password123");
    cy.get("button[type='submit']").click();

    cy.contains(/error/i).should("be.visible");
  });
});
