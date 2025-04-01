describe('Review Flow with Login (user: test1)', () => {
    const username = 'test1';
    const password = 'test1';
  
    before(() => {
      // ✅ Log in
      cy.visit('http://localhost:5173/login');
  
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button').contains('Login').click();
  
      // Redirect should land on home or profile
      cy.url().should('include', '/');
  
      // Navigate to all books
      cy.visit('http://localhost:5173/allbooks');
  
      // Wait for books and click the first
      cy.get('[data-testid="book-card"]', { timeout: 10000 }).should('exist');
      cy.get('[data-testid="book-card"]').first().click();
  
      cy.url().should('include', '/viewBook');
    });
  
    it('adds a review', () => {
      cy.get('textarea[placeholder*="write your review"]')
        .clear()
        .type('This is a Cypress test review');
  
      cy.contains('Submit Review').click();
  
      cy.contains('This is a Cypress test review').should('exist');
    });
  
    it('edits the review', () => {
      cy.contains('Edit').click();
  
      cy.get('textarea')
        .clear()
        .type('Updated Cypress review');
  
      cy.contains('Update Review').click();
  
      cy.contains('Updated Cypress review').should('exist');
    });
  
    it('deletes the review', () => {
      cy.contains('Delete').click();
  
      cy.contains('Updated Cypress review').should('not.exist');
    });
  });
  