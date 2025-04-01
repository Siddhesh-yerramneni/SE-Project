// reviewForm.spec.js
import React from 'react';
import { mount } from '@cypress/react';
import * as reactRedux from 'react-redux';
import ReviewForm from '../../src/components/ReviewForm';

describe('ReviewForm Component (without Redux Provider)', () => {
  const bookId = 123;
  const loggedInUser = { id: 1, name: 'Test User' };

  beforeEach(() => {
    // Restore the original implementation before each test
    cy.stub(reactRedux, 'useSelector').callsFake((selector) => {
      // By default, return a logged in user. Some tests override this.
      return loggedInUser;
    });
  });

  it('submits a new review', () => {
    const refreshReviews = cy.stub().as('refreshReviews');

    // Intercept the POST request made by addReview
    cy.intercept('POST', '/api/reviews', {
      statusCode: 200,
      body: { id: 1, review: 'Great book!' },
    }).as('addReview');

    // Mount the component with no existing review
    mount(
      <ReviewForm bookId={bookId} existingReview={null} refreshReviews={refreshReviews} />
    );

    // Type a new review and submit it.
    cy.get('textarea').type('Great book!');
    cy.get('button').contains('Submit Review').click();

    // Wait for the POST call then assert that refreshReviews was called and the textarea is cleared.
    cy.wait('@addReview');
    cy.get('@refreshReviews').should('have.been.calledOnce');
    cy.get('textarea').should('have.value', '');
  });

  it('edits an existing review', () => {
    const refreshReviews = cy.stub().as('refreshReviews');
    const existingReview = { id: 1, review: 'Not so good' };

    // Intercept the PUT request made by editReview
    cy.intercept('PUT', `/api/reviews/${existingReview.id}`, {
      statusCode: 200,
      body: { id: existingReview.id, review: 'Much better now' },
    }).as('editReview');

    // Mount the component with an existing review.
    mount(
      <ReviewForm bookId={bookId} existingReview={existingReview} refreshReviews={refreshReviews} />
    );

    // Verify that the textarea is pre-filled, then update it and submit.
    cy.get('textarea').should('have.value', 'Not so good');
    cy.get('textarea').clear().type('Much better now');
    cy.get('button').contains('Update Review').click();

    // Wait for the PUT call then assert that refreshReviews was called and the textarea is cleared.
    cy.wait('@editReview');
    cy.get('@refreshReviews').should('have.been.calledOnce');
    cy.get('textarea').should('have.value', '');
  });

  it('prevents submission when user is not logged in', () => {
    const refreshReviews = cy.stub().as('refreshReviews');

    // Override useSelector to simulate no logged in user.
    reactRedux.useSelector.callsFake(() => null);

    // Spy on console.error to check for the "not logged in" error.
    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });

    // Mount the component with no logged in user.
    mount(
      <ReviewForm bookId={bookId} existingReview={null} refreshReviews={refreshReviews} />
    );

    // Type a review and submit.
    cy.get('textarea').type('Review text');
    cy.get('button').contains('Submit Review').click();

    // Verify that console.error was called with the proper error message and refreshReviews wasn't called.
    cy.get('@consoleError').should('be.calledWith', "User not logged in. Please log in to submit a review.");
    cy.get('@refreshReviews').should('not.have.been.called');
  });
});
