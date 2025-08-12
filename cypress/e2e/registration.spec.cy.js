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
    // cy.apiCreateUser(userData);
  });

describe('User registers to the system', () => {

  it('should open register page and complete registration form', () => {
    cy.visit('/')
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.get('.signup-form > h2').should('contain', 'New User Signup!');
    cy.get('[data-qa="signup-name"]').type(userData.userFirstName);
    cy.get('[data-qa="signup-email"]').type(userData.userEmail);
    cy.get('[data-qa="signup-button"]').click();

    cy.url().should('include', '/signup');
    cy.get('[data-qa="password"]').type(userData.userPassword);
    cy.get('[data-qa="days"]').select('1');
    cy.get('[data-qa="months"]').select('January');
    cy.get('[data-qa="years"]').select('2000');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(userData.userFirstName);
    cy.get('[data-qa="last_name"]').type(userData.userLastName);
    cy.get('[data-qa="company"]').type(userData.userCompany);
    cy.get('[data-qa="address"]').type(userData.userAddress1);
    cy.get('[data-qa="address2"]').type(userData.userAddress2);
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type(userData.userState);
    cy.get('[data-qa="city"]').type(userData.userCity);
    cy.get('[data-qa="zipcode"]').type(userData.userZipCode);
    cy.get('[data-qa="mobile_number"]').type(userData.userMobileNumber);
    cy.get('[data-qa="create-account"]').click();

    cy.url().should('include', '/account_created');
    cy.get('b').should('contain', 'Account Created!');
    cy.get('.col-sm-9 > :nth-child(2)').should('contain', 'Congratulations! Your new account has been successfully created!');
    cy.get('.col-sm-9 > :nth-child(3)').should('contain', 'You can now take advantage of member privileges to enhance your online shopping experience with us.');
    cy.get('[data-qa="continue-button"]').click();

    cy.url().should('include', '/');
    cy.get('.shop-menu > ul > li:nth-child(10) > a').should('contain', 'Logged in as ' + userData.userFirstName);
  });

});