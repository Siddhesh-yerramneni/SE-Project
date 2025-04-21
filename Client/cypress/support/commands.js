Cypress.Commands.add('login', () => {
    cy.request('POST', 'http://127.0.0.1:3000/login', {
      username: 'test',
      password: 'test'
    }).then((res) => {
      expect(res.status).to.eq(200);
      window.localStorage.setItem('currentUser', res.body.token);
    });
  });
  