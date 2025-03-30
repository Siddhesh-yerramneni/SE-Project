describe("Add Book Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/login");
      cy.get("input[name='username']").type("test1");
      cy.get("input[name='password']").type("test1");
      cy.get("button[type='submit']").click();
      cy.url().should("eq", "http://localhost:5173/");
      cy.visit("http://localhost:5173/addBook");
    });
  
    // Check if form loads
    it("should display the Add Book form", () => {
      cy.get("input[name='bookname']").should("exist");
      cy.get("input[name='author']").should("exist");
      cy.get("textarea[name='description']").should("exist");
      cy.get("input[name='price']").should("exist");
      cy.get("input[name='category']").should("exist");
      cy.get("button[type='submit']").should("exist");
    });
  
    // Test adding a new book
    it("should add a new book successfully", () => {
      cy.get("input[name='bookname']").type("Cypress Test Book");
      cy.get("input[name='author']").type("Cypress Author");
      cy.get("textarea[name='description']").type("This is a test book added via Cypress.");
      cy.get("input[name='price']").type("199");
      cy.get("input[name='category']").type("Testing");
  
      cy.get("button[type='submit']").click();
  
      cy.contains("Book added successfully").should("be.visible");
      cy.url().should("include", "/allBooks");
    });
  });
  