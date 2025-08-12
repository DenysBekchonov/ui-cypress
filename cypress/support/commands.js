import { faker } from '@faker-js/faker';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('apiCreateUser', (userData) => {
  cy.request({
    method: 'POST',
    url: 'https://automationexercise.com/api/createAccount',
    form: true, // sends as application/x-www-form-urlencoded
    body: {
      name: userData.userMiddleName,
      email: userData.userEmail,
      password: userData.userPassword,
      title: userData.userTitle,
      birth_date: 1,
      birth_month: 2,
      birth_year: 1990,
      firstname: userData.userFirstName,
      lastname: userData.userLastName,
      company: userData.userCompany,
      address1: userData.userAddress1,
      address2: userData.userAddress2,
      country: userData.userCountry,
      zipcode: userData.userZipCode,
      state: userData.userState,
      city: userData.userCity,
      mobile_number: userData.userMobileNumber
    }
  }).then((response) => {
    expect(response.status).to.eq(200);

    const body = JSON.parse(response.body);
    expect(body).to.have.property('message', 'User created!');
    expect(body).to.have.property('responseCode', 201);

    console.log('Created user:', userData.userEmail);
  });
});