describe("Home Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    // Check if Hero section loads
    it("should display the hero section", () => {
      cy.contains("Welcome to ShelfWise").should("be.visible");
      cy.contains("Discover your next great read today!").should("be.visible");
    });
  
    // Check if Browse Books button works
    it("should navigate to AllBooks page when clicking Browse Books", () => {
      cy.contains("Browse Books").click();
      cy.url().should("include", "/allBooks");
    });
  
    it("should display featured categories", () => {
        cy.contains("Explore").should("be.visible");
        cy.contains("Categories").should("be.visible");
        cy.contains("Fiction").should("be.visible");
        cy.contains("Non-Fiction").should("be.visible");
        cy.contains("Science-Fiction").should("be.visible");
      });
      
  });
  