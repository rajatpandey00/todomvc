import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import { doLogout } from '../../../../kit'
import * as values from '../../../../fixtures/testDataOne.json'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

Given('User navigates to the user portal', () => {
  cy.visit(values.url)

  cy.get('#logo').should('be.visible')
  cy.get('#logo').should('have.attr', 'src')
})

When('When User enters the <email> and <password> as Beneficiary', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get('#email').clear()
    cy.get('#email').type(element.email)
    cy.get('#password').clear()
    cy.get('#password').type(element.password)
  })
})

And('User click on login button', () => {
  cy.clickById('cd_login_button')
})

Then('Error<error> message is thrown', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get('#cdErrorMsg').should('be.visible')
    cy.get('#cdErrorMsg').contains(element.error)
  })
})

When('User enters the <email> and <password> as Beneficiary', (datatable) => {
  datatable.hashes().forEach((element) => {
    cy.get('#email').clear()
    cy.get('#email').type(element.email)
    cy.get('#password').clear()
    cy.get('#password').type(element.password)
  })
})

And('User click on login button with the <email> and <password>', () => {
  cy.clickById('cd_login_button')
})

Then('User is able to login successfully to the landing page', () => {
  cy.url().should('include', '/dashboard')
  cy.wait(2000)
})

And('The user is able to logout successfully', () => {
  doLogout.logout()
})
