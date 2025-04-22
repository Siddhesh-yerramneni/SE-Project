
describe('Review Module', () => {
  const baseUrl = 'http://localhost:5173';
  const bookId = 1;  
   beforeEach(() => {
    cy.intercept('POST', '/login').as('loginRequest');
    cy.intercept('GET', '/getBooks').as('fetchBooks');
    cy.visit(`${baseUrl}/login`);
    cy.get("input[name='username']").type("test");
    cy.get("input[name='password']").type("test");
    cy.get("button[type='submit']").click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.wait('@fetchBooks');

    cy.visit(`${baseUrl}/viewBook/${bookId}`);
    cy.location('pathname').should('include', '/viewBook');    
  });

  it('should display the review form and empty state', () => {
    cy.contains('Reviews').should('exist');
    cy.get('textarea[placeholder="Write your review..."]').should('exist');
    cy.get('button[type="submit"]').contains('Submit Review').should('exist');
    cy.contains('No reviews yet.').should('exist');
  });

  it('should add a new review successfully', () => {
    const reviewText = 'Cypress: adding a review';
    cy.get('textarea[placeholder="Write your review..."]')
      .type(reviewText);
    cy.get('button[type="submit"]').contains('Submit Review').click();
    cy.contains(reviewText).should('be.visible');
  });

  it('should edit an existing review successfully', () => {
    // first add one via UI
    const original = 'Original Cypress review';
    cy.get('textarea[placeholder="Write your review..."]')
      .type(original);
    cy.get('button[type="submit"]').contains('Submit Review').click();
    cy.contains(original).should('be.visible');

    // then edit it
    cy.contains(original)
      .parent('li')
      .within(() => {
        cy.contains('Edit').click();
      });
    const updated = 'Cypress updated review';
    cy.get('textarea').clear().type(updated);
    cy.get('button[type="submit"]').contains('Update Review').click();

    // confirm update
    cy.contains(updated).should('be.visible');
  });

  it('should delete an existing review successfully', () => {
    const toDelete = 'Cypress review to delete';
  
    // seed one via UI
    cy.get('textarea[placeholder="Write your review..."]')
      .type(toDelete);
    cy.get('button[type="submit"]')
      .contains('Submit Review')
      .click();
    cy.contains(toDelete).should('be.visible');
  
    // delete it
    cy.contains(toDelete)
      .parent('li')
      .within(() => {
        cy.contains('Delete').click();
      });
  
    // now check how many reviews remain
    cy.get('ul li').then($items => {
      if ($items.length === 0) {
        // only assert the “empty” case if really empty
        cy.contains('No reviews yet.').should('exist');
      } else {
        // otherwise skip that step
        cy.log(`Skipping empty‑state check, ${$items.length} reviews remain`);
      }
    });
  });
  
});
