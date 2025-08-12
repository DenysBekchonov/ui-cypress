import { faker } from '@faker-js/faker';

let userData;

before(function () {
    userData = {
    userEmail: faker.internet.email(),
    userMiddleName: faker.person.middleName(),
    userFirstName: faker.person.firstName(),
    userLastName: faker.person.lastName(),
    userTitle: faker.person.prefix(),
    userBirthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    userEmailNotExist: faker.internet.email(),
    userPassword: faker.internet.password({length: 10, memorable: false, pattern: /[a-zA-Z0-9]/}),
    userCompany: faker.company.name(),
    userAddress1: faker.location.streetAddress(),
    userAddress2: faker.location.secondaryAddress(),
    userCountry: faker.location.country(),
    userZipCode: faker.location.zipCode(),
    userState: faker.location.state(),
    userCity: faker.location.city(),
    userMobileNumber: faker.phone.number({ style: 'international' }),
    };
    cy.wrap(userData).as('userData');
    cy.apiCreateUser(userData);
  });
  
describe('User logs in to the system', () => {

  it('should open login page and complete login to the system', () => {
    cy.visit('/')
    cy.get('a[href="/login"]').click();

    cy.url().should('include', '/login');
    cy.get('[data-qa="login-email"]').type(userData.userEmail);
    cy.get('[data-qa="login-password"]').type(userData.userPassword);
    cy.get('[data-qa="login-button"]').click();
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

    cy.url().should('include', '/delete_account');
    cy.get('b').should('contain', 'Account Deleted!');
    cy.get('.col-sm-9 > :nth-child(2)').should('contain', 'Your account has been permanently deleted!');
    cy.get('.col-sm-9 > :nth-child(3)').should('contain', 'You can create new account to take advantage of member privileges to enhance your online shopping experience with us.');
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should('include', '/');
  });
})