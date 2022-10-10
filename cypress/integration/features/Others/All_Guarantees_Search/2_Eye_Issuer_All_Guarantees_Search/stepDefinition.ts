import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { doLogin, doLogout, navigate } from '../../../../../kit'
import * as guarantee from '../../../../../fixtures/createGuarantee.json'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

beforeEach(() => {
  cy.intercept('GET', '/api/profile/orgs').as('allOrgs')
  cy.intercept('GET', '/api/profile/orgs?entityType=ISSUER').as('searchIssuer')
})

Given('the user has an existing guarantee on the platofrm', () => {
  doLogin.loginAsIssuer().then(() => {
    navigate.navigateToAllGuarantees()
  })
})

When('the user navigates to the All guarantees page', () => {
  cy.wait(2000)
})

And('selects the filter option', () => {
  cy.clickByAriaLabel('filter')
})

And('the filter search pop up should be displayed', () => {
      cy.wait('@allOrgs').then(({ response }) => {
      if (response?.statusCode === 200) {
        cy.log('All Orgs Resolved')
      }
    })
  cy.wait(6000)
  cy.fillValueById(guarantee.applicantName, 'applicant', true)
  cy.wait(5000)
  cy.fillValueById(guarantee.priBeneName, 'Beneficiary_0', true)
  cy.wait(5000)
  //cy.get('.css-zm89ka > svg').click()
  cy.clickById('add-0-btn')
  cy.fillValueById(guarantee.activeBene1Name, 'Beneficiary_1', true)
  cy.wait(5000)
  //add-1-btn
    cy.clickById('add-1-btn')
  // cy.get('.css-zm89ka svg:nth-of-type(2)').click()
  cy.wait(5000)
  cy.fillValueById(guarantee.activeBene2Name, 'Beneficiary_2', true)
})

When('the user performs search using the status of the guarantee as active', () => {
  cy.clickById('select-status')
  cy.get('li[data-value="ACTIVE"]').click()
  cy.get('button[type="submit"]').click()
})

Then('the user should be redirected to the All guarantees page', () => {
  cy.wait(2000)
})

When('the user changes the rows per page', () => {

})

And('the filtered guarantee results should be displayed', () => {
  cy.get('tr td:nth-child(1)').each(($el, index, $list) => {
    const tempVal = $el.text()
    tempVal == 'Active'
  })
})

When('the user navigates through the pages', () => {
  cy.clickByAriaLabel('Next Page')
  cy.wait(5000)
  cy.get('tr td:nth-child(1)').each(($el, index, $list) => {
    const tempVal = $el.text()
    tempVal == 'Active'
  })
})

Then('the filtered guarantee results should be displayed', () => {})

When('the user changes the rows per page', () => {
  cy.wait(6000)
})

Then('the number of results displayed changes as per the selection', () => {})

When('the user clicks on the csv download options', () => {})

Then('the csv download should be successful', () => {
  doLogout.logout()
})