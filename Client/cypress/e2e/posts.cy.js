describe('Posts Module', () => {
  const baseUrl = 'http://localhost:5173';

  
  beforeEach(() => {
    cy.intercept('POST', '/login').as('loginRequest');
    cy.intercept('GET', '/getBooks').as('fetchBooks');
    cy.visit(`${baseUrl}/login`);
    cy.get("input[name='username']").type("test");
    cy.get("input[name='password']").type("test");
    cy.get("button[type='submit']").click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.wait('@fetchBooks');

    cy.visit(`${baseUrl}/allPosts`);
    cy.location('pathname').should('include', '/allPosts');
  });

  it('should display all posts correctly', () => {
    cy.contains('All Posts').should('exist');
    cy.get('[data-cy="post-card"]').should('exist');
  });

  it('should create a new post', () => {
    cy.visit(`${baseUrl}/createPost`);
    cy.get('input[name="title"]').type('New Cypress Post');
    cy.get('textarea[name="content"]').type('This post was created by Cypress test.');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/allPosts');
    cy.contains('New Cypress Post').should('exist');
  });

  it('should navigate to edit page and update post', () => {
    cy.get('[data-cy="post-card"]').first().within(() => {
      cy.contains('Edit').click();
    });
    cy.url().should('include', '/editPost');
    cy.get('input[name="title"]').clear().type('Updated Post Title');
    cy.get('textarea[name="content"]').clear().type('Updated content by Cypress.');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/allPosts');
    cy.contains('Updated Post Title').should('exist');
  });

  it('should delete a post after confirmation', () => {
    cy.get('[data-cy="post-card"]').first().within(() => {
      cy.contains('Delete').click();
    });
    cy.on('window:confirm', () => true);
    cy.contains('Post deleted successfully').should('exist');
  });
});
